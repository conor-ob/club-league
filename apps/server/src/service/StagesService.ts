import { stageNumberFromStageId } from '@club-league/utils'
import type { Database } from '../database/Database'
import { Table } from '../database/Table'
import type { StageEntity } from '../entity/StageEntity'
import type { Stage } from '../generated/graphql'
import type { StageMapper } from '../mapping/StageMapper'

export class StagesService {
  private database: Database
  private stageMapper: StageMapper

  constructor(database: Database, stageMapper: StageMapper) {
    this.database = database
    this.stageMapper = stageMapper
  }

  public getStage(stageId: string): Stage {
    const stageEntity = this.database.getById<StageEntity>(
      Table.STAGES,
      stageId
    )
    return this.stageMapper.map(stageEntity)
  }

  public getStages(seasonId: string): Stage[] {
    const stageEntities = this.database.get<StageEntity>(
      Table.STAGES,
      (value: string) => value.includes(seasonId)
    )
    return this.stageMapper
      .mapAll(stageEntities)
      .sort(
        (a, b) =>
          Number(stageNumberFromStageId(a.id)) -
          Number(stageNumberFromStageId(b.id))
      )
  }
}
