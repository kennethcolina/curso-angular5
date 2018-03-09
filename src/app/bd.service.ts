import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import { Progresso } from './progresso.service'
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';

@Injectable()
export class Bd {

	constructor(private progresso: Progresso) { }

	public publicar(publicacao: any): void {

		firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
			.push({ titulo: publicacao.titulo })
			.then((resposta: any) => {

				let nomeImagem = resposta.key

				firebase.storage().ref()
					.child(`imagens/${nomeImagem}`)
					.put(publicacao.imagem)
					.on(firebase.storage.TaskEvent.STATE_CHANGED,
						//acompanhamento do progresso do upload
						(snapshot: any) => {
							this.progresso.status = 'andamento'
							this.progresso.estado = snapshot
							//console.log('Snapshot capturado no on(): ', snapshot)
						},
						(error) => {
							this.progresso.status = 'erro'
							//console.log(error)
						},
						() => {
							//finalização do processo
							this.progresso.status = 'concluido'
							//console.log('upload completo')
						}
					)
			})
	}

	consultaPublicacoes(emailUsuario: string): Promise<any> {

		return new Promise((resolve, reject) => {

			firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
				.orderByKey()
				.once('value')
				.then(snapshot => {

					let publicacoes: Array<any> = []

					snapshot.forEach(childSnapshot => {

						let publicacao = childSnapshot.val()
						publicacao.key = childSnapshot.key
						publicacoes.push(publicacao)

					})

					return publicacoes.reverse()

				}).then(publicacoes => {

					publicacoes.map(publicacao => {
						firebase.storage().ref()
							.child(`imagens/${publicacao.key}`)
							.getDownloadURL()
							.then(url => {

								publicacao.url_imagem = url

								firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
									.once('value')
									.then(snapshot => {
										publicacao.nome_usuario = snapshot.val().nome_usuario
									})

							})

					})

					resolve(publicacoes)

				})


		})

	}

}
