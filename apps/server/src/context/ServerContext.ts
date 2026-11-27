import type { GcService } from '../service/GcService'
import type { MarshallsService } from '../service/MarshallsService'
import type { RedirectService } from '../service/RedirectService'
import type { RoutesService } from '../service/RoutesService'
import type { StageResultsService } from '../service/StageResultsService'
import type { StagesService } from '../service/StagesService'

export interface ServerContext {
  gcService: GcService
  marshallsService: MarshallsService
  routesService: RoutesService
  stageResultsService: StageResultsService
  stagesService: StagesService
  redirectService: RedirectService
}
