import { Usuario } from './acesso/usuario.model'
import * as firebase from 'firebase'

export class Autenticacao {

	cadastrarUsuario(usuario: Usuario): Promise<any> {
		return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
			.then(
				resposta => {

					delete usuario.senha
					firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
						.set(usuario)
				}
			,
				erro => console.log(erro)
			)
	}

	autenticar(email: string, senha: string) {
		console.log(email, senha)
		firebase.auth().signInWithEmailAndPassword(email, senha)
			.then(
				resposta => console.log(resposta),
				erro => console.log(erro)
			)

	}

}
