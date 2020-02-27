import React from 'react';
import './PreviewContainer.scss';
import { connect } from 'react-redux';
import ReadingPreview from '../../components/ReadingPreview/ReadingPreview';

const PreviewContainer = (props) => {
  return (
    <section className='preview-container'>
      <h2 className='saved-title'>Saved Readings</h2>
      {!props.favorites.length ? <h2>You have not saved any readings yet.</h2> :
      props.favorites.map(favorite => {
        return <ReadingPreview key={favorite.id} reading={favorite} />
      })
      }
    </section>
  )
}

const mapStateToProps = state => ({
  favorites: state.favorites
})

export default connect(mapStateToProps)(PreviewContainer)
