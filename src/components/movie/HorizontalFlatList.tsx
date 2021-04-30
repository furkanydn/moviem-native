import React from 'react';
import {times} from 'lodash';
import {FlatList, StyleSheet, View} from 'react-native';
//
import {MovieID} from '../../redux/indexIE';
import {THEME} from '../../utils/theme';
import {movieIDsKeyExtract} from '../../utils/movie';
import Preview, {PreviewProps} from './Preview';

// Durum ve Özellikler
type Props = {
  movieIDs: MovieID[];
  previewAddProps?: Partial<PreviewProps>;
};

// Bileşen
class HorizontalFlatList extends React.PureComponent<Props> {
  renderPreview = ({item, index}: {item: MovieID; index: number}) => (
    <Preview
      movieID={item}
      highPriority={index < 5}
      {...this.props.previewAddProps}
    />
  );

  renderEmpty = () => (
    <View style={styles.emptyContainer}>
      {times(4).map(value => (
        <Preview key={value} />
      ))}
    </View>
  );

  render() {
    const {movieIDs} = this.props;
    const empty = movieIDs.length === 0;

    return (
      <FlatList
        data={movieIDs}
        renderItem={this.renderPreview}
        horizontal
        style={styles.list}
        scrollEnabled={!empty}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={this.renderEmpty}
        keyExtractor={movieIDsKeyExtract}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: THEME.spacing.s,
    paddingVertical: THEME.spacing.s,
  },
  emptyContainer: {
    flexDirection: 'row',
  },
});

export default HorizontalFlatList;
