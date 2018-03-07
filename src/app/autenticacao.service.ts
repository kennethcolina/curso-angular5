import { Usuario } from './acesso/usuario.model'
import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Autenticacao {

	token_id: string

	constructor(private router: Router) {}

	cadastrarUsuario(usuario: Usuario): Promise<any> {
		return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
			.then(
				resposta => {

					delete usuario.senha
					firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
						.set(usuario)
				},
				erro => console.log(erro)
			)
	}

	autenticar(email: string, senha: string) {
		firebase.auth().signInWithEmailAndPassword(email, senha)
			.then(
				resposta => {
					firebase.auth().currentUser.getIdToken()
						.then((idToken: string) => {
							this.token_id = idToken
							localStorage.setItem('idToken', idToken)
							this.router.navigate(['/home'])
						})
				},
				erro => console.log(erro)
			)
	}

	autenticado() {

		if(this.token_id === undefined && localStorage.getItem('idToken') !== null) {
			this.token_id = localStorage.getItem('idToken')
		}

		if(this.token_id === undefined) {
			this.router.navigate(['/'])
		}

		return this.token_id !== undefined
	}

	logout() {
		firebase.auth().signOut()
			.then(
				() => {
					localStorage.removeItem('idToken')
					this.token_id = undefined
					this.router.navigate(['/'])
				},
				erro => console.error(erro)
			)
	}

}
