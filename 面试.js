let a={
				b:(()=>{
					return [0,1,2].map((el)=>{
						return {
							el
						}
					}).some(el=>{
						return !!el[Object.keys(el)[0]]
					})
				})()
			}
			let b = Object.prototype.toString.call(a.b)
			// console.log(b)
