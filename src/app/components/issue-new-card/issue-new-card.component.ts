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

  channel: any;
  originStation: any;
  destinationStation: any;
  journeyAmount: any = 0;

  channelsList: any = [
    {
      code: 'METRO',
      desc: 'Metro',
    },
    {
      code: 'BUS',
      desc: 'Bus',
    }
  ];

  stationsList: any = [
    {
      code: 'HAM',
      desc: 'Hamilton',
      zones: 'ZONE_1'
    },
    {
      code: 'TUB',
      desc: 'Thunder Bay',
      zones: 'ZONE_1,,ZONE_2'
    },
    {
      code: 'DDN',
      desc: 'Dryden',
      zones: 'ZONE_3'
    },
    {
      code: 'SFL',
      desc: 'Slate Falls',
      zones: 'ZONE_2'
    }
  ];



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
        (response) => {
          console.log('response received')
          if (response) {
            this.cardDetails = response;
          }

          this.errorMessage = undefined;
        },
        (error) => {
          console.error('Request failed with error')
          if (error && error.error) {
            this.errorMessage = error.error.text;
            this.cardDetails = undefined;
          }
        },
        () => {
          console.error('Request completed');
        });
  }

  calculateJourneyAmount() {
    let request = {
      entryZone: this.originStation.zones,
      exitZone: this.destinationStation.zones,
      channel: this.channel.code
    };

    this.cardService.calculateJourneyAmount(request)
      .subscribe(
        (response) => {
          console.log('response received')
          if (response) {
            this.journeyAmount = response;
          }
          this.errorMessage = undefined;
        },
        (error) => {
          console.error('Request failed with error')
          if (error && error.error) {
            this.errorMessage = error.error.text;
          }
        },
        () => {
          console.error('Request completed');
        });
  }

  updateJourneyInfo() {
    let journeyFlow = {
      cardNumber: this.cardNumber,
      channel: this.channel.code,
      balance: this.cardDetails.balance,
      journeyAmount: this.journeyAmount,
      afterJourneyBalance: this.cardDetails.balance - this.journeyAmount,
      entryPoint: {
        station: this.originStation.code,
        zone: this.originStation.zones
      },
      exitPoint: {
        station: this.destinationStation.code,
        zone: this.destinationStation.zones
      }
    }

    this.cardService.saveJourneyFlow(journeyFlow)
      .subscribe(
        (response) => {
          console.log('response received')
          if (response) {
            this.journeyAmount = response;
          }
          this.errorMessage = undefined;
        },
        (error) => {
          console.error('Request failed with error')
          if (error && error.error) {
            this.errorMessage = error.error.text;
          }
        },
        () => {
          console.error('Request completed');
        });

  }

}
