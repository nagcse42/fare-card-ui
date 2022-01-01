import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';

@Component({
  selector: 'issue-new-card',
  templateUrl: './issue-new-card.component.html',
  styleUrls: ['./issue-new-card.component.scss']
})
export class IssueNewCardComponent implements OnInit {

  cardNumber: any;
  cardDetails: any;
  errorMessage: any;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
  }

  issueCard() {
    this.cardService.issueCard();
  }

  topupCardBalance() {
    this.cardService.topupCardBalance();
  }

  getCardDetails() {
    this.cardService.getCardDetails();
  }

  validateCard() {
    this.cardService.validatecard(this.cardNumber)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          if (response) {
            this.cardDetails = response;
          }

          this.errorMessage = undefined;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          if (error && error.error) {
            this.errorMessage = error.error.text;
            this.cardDetails = undefined;
          }
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed 
        })
  }

}
