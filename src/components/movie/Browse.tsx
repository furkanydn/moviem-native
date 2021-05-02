import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
//
import {
  refreshSectionRequest,
  browseSectionKey,
  SectionKeys,
} from '../../redux/indexIE';
import {HorizontalScroll} from '../index';

// Durum ve Özellikler
const MapStateProps = () => ({});

const MapDispatchProps = {refreshSectionRequest};

type ReduxProps = ReturnType<typeof MapStateProps> & typeof MapDispatchProps;
type Props = ReduxProps;

// Bileşen
class Browse extends React.PureComponent<Props> {
  fetchDataS = () => {
    const {refreshSectionRequest} = this.props;
    browseSectionKey.map(sectionKey => {
      refreshSectionRequest(sectionKey);
    });
  };

  componentDidMount() {
    this.fetchDataS();
  }

  renderScroll = ({item}: {item: SectionKeys}) => (
    <HorizontalScroll sectionKey={item} />
  );

  render() {
    return (
      <FlatList
        data={browseSectionKey}
        renderItem={this.renderScroll}
        keyExtractor={sectionKey => sectionKey}
        showsVerticalScrollIndicator={false}
        style={styles.browse}
      />
    );
  }
}

const styles = StyleSheet.create({
  browse: {
    alignSelf: 'stretch',
  },
});

export default connect(MapStateProps, MapDispatchProps)(Browse);
