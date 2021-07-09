
<template>
	<view class="pickFile" v-if="complex">
		<view class="btn" @click="pickFile">
			选择文件
		</view>
		<scroll-view scroll-y="true" class="scroll-Y" v-if="files.length != 0">
			<view class="filelist">
				<view v-for="(file,index) in files"  :key="index" class="file"  :class="{
					'files-border':index !== 0 }">
					<view class="files__name">{{index+1}}. {{file.name}}</view>
					<view v-if="delIcon&&!readonly" class="icon-del-box icon-files" @click="delFile(index)">
						<view class="icon-del icon-files"></view>
						<view class="icon-del rotate"></view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			type: {
				type: String,
				default: '&#xe644;'
			},
			color: {
				type: String,
				default: '#666666'
			},
			fontSize: {
				type: String,
				default: '34rpx'
			}
		},
		methods: {
			pickFile(){
				uni.chooseFile({
				  count: this.limitLength, //默认100
				  type: 'all',
				  // extension:['.zip','.doc'],
					success: (res)=> {
						uni.showLoading({
							title: '上传中...'
						});
						let filePaths = res.tempFilePaths;
						let files = res.tempFiles;
						let fileLen = res.tempFiles.length
						if(fileLen>0&&fileLen<this.limitLength&&this.files.length+fileLen<=this.limitLength){
							this.uploadFiles(files,filePaths)
						}else{
							uni.showToast({
								position:'top',
								title: `当前选择了${files.length}个文件 ，超出了文件限制的长度${this.limitLength}`,
								icon: 'none',
								duration: 5000
							})
							setTimeout(function() {
								uni.hideLoading();
							}, 250);

						}

					}
				});
			},
			uploadFiles(files,filePaths){
				let count = 0
				let len = files.length
				let self = this
				while (count < this.limitLength) {
					next();
				}
				function next() {
					let cur = count++;
					if (cur >= len) {
						return;
					}
					let fileItem = files[cur];
					let filePathItem = filePaths[cur];
					self.uploadFile(fileItem,filePathItem)
				}
			},
			uploadFile(file,filePath){
				uni.uploadFile({
					url: this.$api.apiBaseUrl + '/file/upload',
					filePath: filePath,
					name: 'files',
					header: {
						'Accept': 'application/json',
						// 'Content-Type': 'multipart/form-data',
						'accessToken':this.$api.userToken.accessToken,
						'clientId':this.$api.clientId
					},
					success: async (uploadFileRes) => {
						let resData = JSON.parse(uploadFileRes.data)
						if(resData&&resData.code){
							this.$api.showError(resData)
						}else{
							resData[0].path = this.$api.apiBaseUrl+'/file/preview?id='+resData[0].id+'&accessToken='+this.$api.userToken.accessToken
							resData[0].name = file.name
							resData[0].size = file.size
							resData[0].uuid = Date.now()
							let filedata = await this.getFileData(resData[0] , this.fileMediatype)
							this.files.push(filedata)

						}
					},
					fail: (error) => {
						if (error && error.code) {
							this.$common.showError(error.code);
						}
					},
					complete: () => {
						setTimeout(function() {
							uni.hideLoading();
						}, 250);
					}
				});
			},
			delFile(index){
				this.files.splice(index,1)
			},
			/**
			 * 获取文件名和后缀
			 * @param {Object} name
			 */
			getFileExt(name) {
				const last_len = name.lastIndexOf('.')
				const len = name.length
				return {
					name: name.substring(0, last_len),
					ext: name.substring(last_len + 1, len)
				}
			},

			/**
			 * 获取图片信息
			 * @param {Object} filepath
			 */
			getFileInfo(filepath) {
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: filepath,
						success(res) {
							resolve(res)
						},
						fail(err) {
							reject(err)
						}
					})
				})
			},

			/**
			 * 获取封装数据
			 */
			async getFileData(files, type) {
				// 最终需要上传数据库的数据
				// console.log(files)
				let fileFullName = this.getFileExt(files.name)
				const extname = fileFullName.ext.toLowerCase()
				let filedata = {
					name: files.name,
					uuid: files.uuid,
					id: files.id,
					extname: extname || '',
					// cloudPath: files.cloudPath,
					fileType: extname || '',
					url: files.path || '',
					size: files.size, //单位是字节
					image: {},
					path: files.path,
					video: {}
				}
				if (type === 'image') {
					const imageinfo = await this.getFileInfo(files.path)
					filedata.image.width = imageinfo.width
					filedata.image.height = imageinfo.height
					filedata.image.location = imageinfo.path
				}
				return filedata
			},
		}
	}
</script>

<style scoped>
	.btn{
		display: inline-block;
		width: 120rpx;
		height: 70rpx;
		margin: 10rpx;
		padding: 0 20rpx;
		border-radius: 10rpx;
		text-align: center;
		line-height: 70rpx;
		background-color: #0A98D5;
		color: #FFFFFF;
	}
	
	/* .filelist {
		position: relative;
	} */
	
	.file {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		padding: 8px 10px;
		padding-right: 5px;
		padding-left: 10px;
		position: relative;
	}
	
	.files-border {
		border-top: 1px #eee solid;
	}
	
	.files__name {
		flex: 1;
		font-size: 14px;
		color: #666;
		margin-right: 25px;
		/* #ifndef APP-NVUE */
		word-break: break-all;
		word-wrap: break-word
		/* #endif */
	}
	
	.icon-files {
		/* #ifndef APP-NVUE */
		position: static;
		background-color: initial;
		/* #endif */
	}
	.rotate {
		position: absolute;
		transform: rotate(90deg);
	}
	
	.icon-del-box {
		/* #ifndef APP-NVUE */
		display: flex;
		margin: auto 0;
		/* #endif */
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0px;
		bottom: 0;
		right: 5px;
		height: 26px;
		width: 26px;
		// border-radius: 50%;
		// background-color: rgba(0, 0, 0, 0.5);
		z-index: 2;
		transform: rotate(-45deg);
	}
	
	.icon-del {
		width: 15px;
		height: 1px;
		background-color: #333;
		// border-radius: 1px;
	}

</style>


