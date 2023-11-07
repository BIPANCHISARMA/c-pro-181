import {StatusBar} from 'expo-status-bar';
import React, {Component} from "react";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Platform,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from "expo-face-detector";

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasCameraPermission: null,
			faces: [],
		};
        this.onFacesDetected = this.onFacesDetected.bind(this);
	}

	async componentDidMount(){
		const {status} = await Camera.requestPermissionsAsync();
		this.setState({hasCameraPermission: status ==="granted"});

	};

	onFacesDetected({faces}) {
		this.setState({faces: faces});
	};

	onFaceDetectionError = (error) => {
		console.log(error);
	};

	render() {
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		}
		if (hasCameraPermission === false) {
			return (
				<View style={styles.container}>
					<Text>No access to camera</Text>
				</View>
			);
		}
		console.log(this.state.faces);
		return (
			<View style={styles.container}>
				<SafeAreaView style={styles.droidSafeArea} />
				<View style={styles.headingContainer}>
					<Text style={styles.titleText}>FRAPP</Text>
				</View>
				<View style={styles.cameraStyle}>
					<Camera
						style={{ flex: 1 }}
						type={Camera.Constants.Type.front}
						faceDetectorSettings={{
							mode: FaceDetector.FaceDetectorMode.fast,
							detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
							runClassifications: FaceDetector.FaceDetectorClassifications.all,
						}}
						onFacesDetected={this.onFacesDetected}
						onFacesDetectionError={this.onFacesDetectionError}
					/>
					{this.state.faces.map((face)=>{
						return<filter1 key = {face.faceID} face = {face}></filter1>
					})}
				</View>
				<View style={styles.filterContainer}></View>
				<View style={styles.actionContainer}></View>
			</View>
		);
	}


}


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	droidSafeArea: {
		marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	headingContainer: {
		flex: 0.1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleText: {
		fontSize: 30,
	},
	cameraStyle: {
		flex: 0.65,
	},
	filterContainer: {},
	actionContainer: {},
});

