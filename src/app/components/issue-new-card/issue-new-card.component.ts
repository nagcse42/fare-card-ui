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
  touchPointDetails: any = [];
  displayedColumns: string[] = ['id', 'channel', 'entryStation', 'exitStation', 'journeyAmount', 'afterJourneyBalance'];

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
    this.cardService.validatecard(this.cardNumber).subscribe(
      (response) => {
        console.log('response received')
        if (response) {
          this.cardDetails = response;
        }

        this.errorMessage = undefined;
      }, (error) => {
        console.error('Request failed with error')
        if (error && error.error) {
          this.errorMessage = error.error.text;
          this.cardDetails = undefined;
        }
      });
  }

  calculateJourneyAmount() {
    if (!this.originStation) {
      this.errorMessage = 'Please select origin station.';
      return;
    } else if (!this.channel) {
      this.errorMessage = 'Please select journey channel.';
      return;
    }

    let request = {
      entryZone: this.originStation.zones,
      exitZone: this.destinationStation ? this.destinationStation.zones : '',
      channel: this.channel.code
    };

    this.cardService.calculateJourneyAmount(request).subscribe(
      (response) => {
        console.log('response received')
        if (response) {
          this.journeyAmount = response;
        }
        this.errorMessage = undefined;
      }, (error) => {
        console.error('Request failed with error')
        if (error && error.error) {
          this.errorMessage = error.error.text;
        }
      });
  }

  updateJourneyInfo() {
    if (this.journeyAmount == 0) {
      this.errorMessage = 'Please calculate amount first.';
      return;
    }

    let journeyFlow = {
      cardNumber: this.cardNumber,
      channel: this.channel.code,
      balance: this.cardDetails.balance,
      journeyAmount: this.journeyAmount,
      afterJourneyBalance: this.cardDetails.balance - this.journeyAmount,
      entryPoint: {
        station: this.originStation.desc,
        zone: this.originStation.zones
      },
      exitPoint: {
        station: this.destinationStation ? this.destinationStation.desc : '',
        zone: this.destinationStation ? this.destinationStation.zones : ''
      }
    }

    this.cardService.saveJourneyFlow(journeyFlow).subscribe(
      (response) => {
        if (response) {
          this.touchPointDetails = response;
        }
        this.cardDetails.balance = this.cardDetails.balance - this.journeyAmount;
        this.errorMessage = undefined;
      }, (error) => {
        if (error && error.error) {
          this.errorMessage = error.error.text;
        }
      });
  }

}
