import { FRASES } from './frases-mock';
import { Component, EventEmitter, OnInit, Output,} from '@angular/core';
import { Frase } from '../shared/frase.model';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit{

  public frases: Array<Frase> = FRASES;
  public instrucao: string = 'Traduza a frase:';
  public resposta: string = '';
  public rodada:number = 0;
  public rodadaFrase: Frase = {fraseEnglish: '', frasePtBr: ''};
  public progresso: number = 0;
  public tentativas: number = 3;
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter() //LEMVBRAR DO IGUAL

  constructor() {
    this.atualizaRodada();
  }

  ngOnInit(): void {
  }

  public atualizaResposta(resposta: Event){
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificarResposta(){
    if(this.resposta == this.rodadaFrase.frasePtBr){
      this.rodada++;
      this.progresso = this.progresso + (100/ this.frases.length);
      if(this.rodada === 4){
        this.encerrarJogo.emit('vitoria');
      }
      this.atualizaRodada();
    }else{
      alert('A tradução está incorreta');
      this.tentativas--;
      if(this.tentativas === -1){
        this.encerrarJogo.emit('derrota');
      }
    }
  }

  public atualizaRodada(){
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';
  }
}
