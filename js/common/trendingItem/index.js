import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export default class TrendingItem extends React.Component {
    render() {
        const { item, onSelect } = this.props
        let favoriteButton =
            <TouchableOpacity
                style={{ padding: 6 }}
                underlayColor={'transparent'}
                onPress={() => { }}
            >
                <FontAwesome
                    name={'star-o'}
                    size={26}
                    style={{ color: 'red' }}
                />
            </TouchableOpacity>
        if (!item) return null
        console.log("item:---------------here>", item)
        return (
            <TouchableOpacity onPress={onSelect}>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>
                        {console.log("inner fullname:------", item.fullName)}
                        {item.fullName}
                    </Text>
                    <Text style={styles.description}>
                        {item.meta}
                    </Text>
                    <View style={styles.row_container}>
                        <View style={styles.row}>
                            <Text style={{ alignItems: 'center' }}>Build By:</Text>
                            {item.contributors.map((result, i, arr)=>{
                                return (
                                    <Image
                                        key={i}
                                        style={{ height: 22, width: 22, margin: 2 }}
                                        source={{ uri: arr[i] }}
                                    />
                                )
                            })}
                            
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Star:</Text>
                            <Text>{item.starCount}</Text>
                        </View>
                        {favoriteButton}
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
    },
})