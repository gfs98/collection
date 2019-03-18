import  React,{Component}  from 'react';

import  {Text,View,ScrollView,StyleSheet,RefreshControl}  from 'react-native';


export  default  class  TestApp  extends  Component{

	
	render(){

		return (
				<View>
					<ScrollView  
						refreshControl = {

							<RefreshControl 
									refreshing={false}
							/>
						}

					>
						<View style={styles.one}>
						
						</View>
						<View style={styles.two}>
						
						</View>
						<View style={styles.three}>
						
						</View>
						<View style={styles.four}>

						</View>
					</ScrollView>
				</View>

			)
	}
}

// 定义样式
const  styles = StyleSheet.create({
	one:{
		height:200,
		backgroundColor:'yellow'
	},
	two:{
		height:200,
		backgroundColor:'blue'
	},
	three:{
		height:200,
		backgroundColor:'green'
	},
	four:{
		height:200,
		backgroundColor:'red'
	}
})