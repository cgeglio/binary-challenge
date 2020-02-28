import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ReadingPreview.scss';
import { addReading } from '../../actions';
import { connect } from 'react-redux'

export class ReadingPreview extends Component {

  updateCurrentReading = () => {
    this.props.makeSavedReadingCurrentReading(this.props.reading);
  }

  render() {
    return (
      <article className='saved-preview'>
        <div className='preview-cards'>
          {this.props.reading.cards.map(card => {
            return <><div className='preview-overlay'></div><img src={process.env.PUBLIC_URL + `/cardAssets/${card.name_short}.jpg`} alt="Tarot card" key={card.name} /></>
          })
        }
        </div>
        <h2 className='preview-question'>{this.props.reading.question}</h2>
        <Link to={`/saved/${this.props.reading.id}`}><button onClick={() => this.updateCurrentReading()} className='view-reading-btn'>View Reading</button></Link>
      </article>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  makeSavedReadingCurrentReading: savedReading => (dispatch(addReading(savedReading)))
})

export default connect(null, mapDispatchToProps)(ReadingPreview)
