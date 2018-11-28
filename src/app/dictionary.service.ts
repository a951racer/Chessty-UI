import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Chess } from 'chess.js/chess.js';
import { apiConfig } from './api.config';
import { Http, Headers, Request, RequestMethod, Response } from '@angular/http';

@Injectable()
export class DictionaryService {
  private _baseURL = apiConfig.gamesURL;
  constructor (private _http: Http) {}

  startGame(game: any): Observable<any> {
    return this._http
      .post(this._baseURL, game)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

  executeMove(gameId: string, move: any): Observable<any> {
    return this._http
      .put(`${this._baseURL}/${gameId}`, move)
      .map((res: Response) => res.json())
      .catch(this.handleError);
    }

/***  Error Handling **************************************/

  private handleError(error: Response) {
    return Observable.throw(error.json().message || 'Server error');
  }
}
