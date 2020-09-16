document.addEventListener('DOMContentLoaded', e => {
	const minus = document.querySelector('#minus')
	const plus = document.querySelector('#plus')
	const likeTracker = {}

	const counterTimer = document.querySelector('#counter')
	const incrementTimer = () => {

		counterTimer.textContent = parseInt(counterTimer.textContent, 10) + 1
	}
	let counterInterval = window.setInterval(incrementTimer, 1000)


	const clickHandler = () => {
		document.addEventListener('click', e => {
			//console.log(e.target)
			if (e.target.matches("#minus")) {
				counterTimer.textContent = parseInt(counterTimer.textContent, 10) - 1
			} else if (e.target.matches("#plus")) {
				counterTimer.textContent = parseInt(counterTimer.textContent, 10) + 1
			} else if (e.target.matches("#heart")) {
				const likesList = document.querySelector('.likes')
				let currentNum = counterTimer.textContent

				if (likeTracker[currentNum]) {
					likeTracker[currentNum] += 1
				} else {
					likeTracker[currentNum] = 1
				}

				let liId = `${currentNum}`
				if (document.getElementById(liId)) {
					document.getElementById(liId).textContent = `${currentNum} has been liked ${likeTracker[currentNum]} times`
				} else {
					let numLi = document.createElement('li')
					numLi.id = currentNum
					numLi.textContent = `${currentNum} has been liked ${likeTracker[currentNum]} times`
					const likesList = document.querySelector('.likes')
					likesList.append(numLi)
				}
			} else if (e.target.matches('#pause')) {
				//console.log('pause')
				window.clearInterval(counterInterval)
				document.getElementById("minus").disabled = true;
				document.getElementById("plus").disabled = true;
				document.getElementById("heart").disabled = true;
				document.getElementById("submit").disabled = true;
				const pauseButton = document.querySelector('#pause')
				pauseButton.remove()
				const resumeButton = document.createElement('button')
				resumeButton.id = 'resume'
				resumeButton.textContent = 'resume'
				//console.log(resumeButton)
				const heartButton = document.getElementById('heart')
				heartButton.insertAdjacentElement('afterend', resumeButton)
			} else if (e.target.matches('#resume')) {
				//console.log('')
				document.getElementById("minus").disabled = false;
				document.getElementById("plus").disabled = false;
				document.getElementById("heart").disabled = false;
				document.getElementById("submit").disabled = false;


				const resumeButton = document.querySelector('#resume')
				resumeButton.remove()
				const pauseButton = document.createElement('button')
				pauseButton.id = 'pause'
				pauseButton.textContent = 'pause'
				const heartButton = document.getElementById('heart')
				heartButton.insertAdjacentElement('afterend', pauseButton)
				counterInterval = window.setInterval(incrementTimer, 1000)
			} else if (e.target.matches('#submit')) {
				e.preventDefault()
				const comments = document.getElementById('comment-input')
				const newComment = comments.value
				const ul = document.getElementById('comments-list')
				const li = document.createElement('li')
				li.textContent = newComment
				ul.append(li)
				comments.value = ''
			}
		})
	}

	clickHandler()

})