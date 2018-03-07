import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.pug',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'app';

	ngOnInit() {

		let config = {
			apiKey: "AIzaSyAwa7HsLxUdqP-EsMA5UE6-qwLM3BqVM_g",
			authDomain: "jta-instagram-clone-754d5.firebaseapp.com",
			databaseURL: "https://jta-instagram-clone-754d5.firebaseio.com",
			projectId: "jta-instagram-clone-754d5",
			storageBucket: "jta-instagram-clone-754d5.appspot.com",
			messagingSenderId: "133317135251"
		};

		firebase.initializeApp(config);

	}

}
