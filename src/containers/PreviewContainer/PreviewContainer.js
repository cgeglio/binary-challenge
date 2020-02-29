import React, { Component } from 'react';
import './PreviewContainer.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeQuestion } from '../../actions';
import ReadingPreview from '../../components/ReadingPreview/ReadingPreview';
import PropTypes from 'prop-types';

export class PreviewContainer extends Component {

  resetQuestion = () => {
    this.props.resetQuestionInStore(this.props.question);
  }

  render() {
    return (
      <section className='preview-container fade-in'>
        <h2 className='saved-title'>Saved Readings</h2>
        {!this.props.favorites.length ? <h2 className='saved-error'>You have not saved any readings yet.</h2> :
        this.props.favorites.map(favorite => {
          return <ReadingPreview key={favorite.id} reading={favorite} />
        })
        }
        <Link to='/home'><button onClick={() => this.resetQuestion()} className='back-btn'>Home</button></Link>
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  favorites: state.favorites,
  question: state.question,
})

export const mapDispatchToProps = dispatch => ({
  resetQuestionInStore: question => (dispatch(removeQuestion(question)))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewContainer);

PreviewContainer.propTypes = {
  favorites: PropTypes.array,
  question: PropTypes.string,
  resetQuestionInStore: PropTypes.func
}
