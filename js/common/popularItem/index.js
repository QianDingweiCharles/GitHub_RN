import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import baseItem from '../baseItem'

export default class PopularItem extends baseItem {
  render () {
    const { onSelect, projectModel } = this.props
    const { item } = projectModel
    if (!item || !item.owner) return null
    return (
      <TouchableOpacity onPress={onSelect}>
        <View style={styles.cell_container}>
          <Text style={styles.title}>
            {item.full_name}
          </Text>
          <Text style={styles.description}>
            {item.description}
          </Text>
          <View style={styles.row_container}>
            <View style={styles.row}>
              <Text style={{ alignItems: 'center' }}>Author:</Text>
              <Image
                style={{ height: 22, width: 22 }}
                source={{ uri: item.owner.avatar_url }}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Star:</Text>
              <Text>{item.stargazers_count}</Text>
            </View>
            {this.favoriteIcon()}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cell_container: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  },
  row_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  }
})
