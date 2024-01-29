const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = opts => {
	console.log(1);
	const promise = new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			success => resolve(success),
			error => reject(error),
			opts
		);
		console.log(1.1);
	});
	return promise;
};

const myTimer = duration => {
	// create a promise
	const promise = new Promise((resolve, reject) => {
		// wrap setTimeout inside the promise
		setTimeout(() => {
			resolve('My customised(MyTimer) timer is resolved(Done)!');
		}, duration);
	});
	// return the promise
	return promise;
};

async function trackUserHandler() {
	let posData;
	let timerData;
	try {
		posData = await getPosition();
		timerData = await myTimer(5000);
	} catch (error) {
		console.log(error);
	}
	console.log(timerData, posData);
	myTimer(2000).then(() => console.log('Timer done!'));
	console.log('Getting position...');
}

button.addEventListener('click', trackUserHandler);

Promise.race([getPosition(), myTimer(1000)]).then(data => console.log(data, 'race'));
Promise.all([getPosition(), myTimer(1000)]).then(comibinedData =>
	console.log(comibinedData, 'all')
);
Promise.allSettled([getPosition(), myTimer(1000)]).then(comibinedData =>
	console.log(comibinedData, 'all-settled')
);

// let result = 0;

// for (let i = 0; i < 100000000; i++) {
//   result += i;
// }

// console.log(result);
