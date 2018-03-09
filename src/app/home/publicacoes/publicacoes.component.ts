import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { Bd } from '../../bd.service';

@Component({
	selector: 'app-publicacoes',
	templateUrl: './publicacoes.component.pug',
	styleUrls: ['./publicacoes.component.scss']
})
export class PublicacoesComponent implements OnInit {

	email: string
	publicacoes: [any]

	constructor(private bd: Bd) { }

	ngOnInit() {
		firebase.auth()
			.onAuthStateChanged(user => {

				this.email = user.email;
				this.atualizarTimeLine()

			})
	}

	atualizarTimeLine() {
		this.bd.consultaPublicacoes(this.email)
			.then(publicacoes => {
				console.log(publicacoes)
				this.publicacoes = publicacoes
			})
	}

}
