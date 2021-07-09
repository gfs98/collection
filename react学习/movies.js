import  React,{Component}  from 'react';

import  {Text,View,ScrollView,StyleSheet,RefreshControl,Image}  from 'react-native';

//引入本地文件
var  movieData = require('./movies/moviedata');

//获取本地文件内的数据
var  movies = movieData.movies;   
export  default  class  TestApp  extends  Component{
	render(){
		var  data = [];  //存最终的数据
		var text = "";  //  临时存储数据的变量
		for(let i  in  movies){
			 text = (
			 		<View style={styles.container}  key={i}>
			 			<View>
			 				<Image
			 				 style={styles.img}
					          source={{uri: movies[i].posters.thumbnail}} />
			 			</View>
			 			<View>
					 		<Text>{movies[i].title}</Text>
					 		<Text>{movies[i].year}</Text>
				 		</View>
			 		</View>
			 	)
			data.push(text);
		}
		return (
				<View>
					<ScrollView>
					{data}
					</ScrollView>
				</View>


			)
	}
}

// 定义样式
const  styles = StyleSheet.create({
	img:{
		width:70,
		height:70,
		backgroundColor:'gray'
	},
	container:{
		flexDirection:"row",
		marginLeft:3,
		marginTop:3
	}
})