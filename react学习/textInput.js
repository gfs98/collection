import  React,{Component}  from 'react';

import  {Text,View,TextInput,TouchableOpacity,StyleSheet}  from 'react-native';


export  default  class  TestApp  extends  Component{

	constructor(props){
		super(props);
		this.state = {text:""}
	}
	render(){

		return (
				<View style={styles.body}>
					<View  style={styles.text}>
						<TextInput
							placeholder="请输入文本"
							onChangeText = {(text)=>this.setState({text})}
						/>
					</View>
					<View style={styles.btn}>
						<TouchableOpacity 
							onPress = {()=>alert(this.state.text)}
							activeOpacity={0.9}
						>
						<Text style={{color:'white'}}>
							搜索
						</Text>
						</TouchableOpacity>
					</View>
				</View>

			)
	}
}

// 定义样式
const  styles = StyleSheet.create({
	body:{
		flexDirection:"row",
		marginTop:3,
		marginLeft:3
	},
	text:{
		width:250,
		height:40,
		borderWidth:1,
		borderStyle:'solid',
		borderColor:'gray',
		borderRadius:5
	},
	btn:{
		width:40,
		height:40,
		backgroundColor:"skyblue",
		borderRadius:5,
		marginLeft:4,
		alignItems:"center",
		justifyContent:"center"

	}
})