import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class BaseItem extends React.Component {
    static propTypes = {
        projectModel: PropTypes.object,
        onSelect: PropTypes.func,
        onFavorite: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            isFavorite: this.props.projectModel.isFavorite
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const isFavoroite = nextProps.projectModel.isFavorite
        if (prevState.isFavorite !== isFavoroite) {
            return {
                isFavorite: isFavoroite
            }
        }
        return null
    }

    setFavoriteState (isFavorite) {
        this.props.projectModel.isFavorite = isFavorite
        this.setState({
            isFavorite
        })
    }

    onPressFavorite() {
        const tempState = this.state || {}
        this.setFavoriteState(!tempState.isFavorite)
        this.props.onFavorite(this.props.projectModel.item, !tempState.isFavorite)
    }

    favoriteIcon() {
        return (
            <TouchableOpacity
                onPress={() => this.onPressFavorite()}
            >
                <FontAwesome
                    name={this.state.isFavorite ? 'star' : 'star-o'}
                    size={26}
                    style={{color: '#678'}}
                />
            </TouchableOpacity>
        )
    }

    render() {

    }

}


