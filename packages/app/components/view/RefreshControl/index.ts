import CustomRefreshControl from "./RefreshControl";

export { CustomRefreshControl as RefreshControl };

// export function patchFlatListProps(options = {}) {
//   try {
//     if (Platform.OS === 'web') {
//       setCustomFlatListWeb(options)
//     }
//   } catch (e) {
//     console.error(e)
//   }
// }

// function setCustomFlatListWeb(options) {
//   FlatList.defaultProps = {
//     ...FlatList.defaultProps,
//     renderScrollComponent: props => (
//       <ScrollView
//         {...props}
//         refreshControl={<CustomRefreshControl {...options} refreshing={props.refreshing} onRefresh={props.onRefresh} />}
//       />
//     ),
//   }
// }
