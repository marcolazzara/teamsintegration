import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Subject } from 'rxjs';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  public donut: any = {
    // Created pie chart using Highchart
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45
      }
    },
    title: {
      text: 'Your profile'
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45,
        dataLabels: {
          enabled: false,
      }
      }
    },
    series: [{
      name: 'Operating Systems',
      data: [
        {
          name: 'Windows',
          y: 70.00,
          drilldown: 'windows-versions'
        },
        ['MacOSX', 30.00],
      ]
    }],
    drilldown: {
      series: [{
        name: 'Windows versions',
        id: 'windows-versions',
        data: [
          ['Win 7', 55.03],
          ['Win XP', 15.83],
          ['Win Vista', 3.59],
          ['Win 8', 7.56],
          ['Win 8.1', 6.18]
        ]
      }]
    }
  }
  public options: any = {
    chart: {
      type: 'scatter',
      height: 100,
      backgroundColor: 'transparent'
    },
    title: {
      text: 'Sample Scatter Plot'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        return 'x: ' + Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x) + ' y: ' + this.y.toFixed(2);
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function () {
          return Highcharts.dateFormat('%e %b %y', this.value);
        }
      }
    },
    series: [
      {
        name: 'Normal',
        turboThreshold: 500000,
        data: [[new Date('2018-01-25 18:38:31').getTime(), 2]]
      },
      {
        name: 'Abnormal',
        turboThreshold: 500000,
        data: [[new Date('2018-02-05 18:38:31').getTime(), 7]]
      }
    ]
  }
  email: string;
  formLink: FormGroup;

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: '3 Days Teams Meeting',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'Teams Meeting 1',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'Teams Meeting 2',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private modal: NgbModal) { }

  ngOnInit() {
    // Highcharts.chart('container', this.donut);
    this.email = localStorage.getItem('email');

    this.formLink = this.fb.group({
      link: new FormControl(null, Validators.required),
    });
  }
  go2Link() {
    window.open(this.formLink.controls.link.value, "_blank");

  }
  nextMeeting() {
    window.open("https://teams.microsoft.com/dl/launcher/launcher.html?url=%2F_%23%2Fl%2Fmeetup-join%2F19%3Ameeting_MjI2ZjcwN2ItMTZiOC00ODQ0LWI5OTgtNDhhNGIwMzhjYTAx%40thread.v2%2F0%3Fcontext%3D%257b%2522Tid%2522%253a%252264bf466f-84c1-4aa6-abe5-65ec5fb1a327%2522%252c%2522Oid%2522%253a%2522a66a9919-4b07-4154-b7cd-929e439283fd%2522%257d%26anon%3Dtrue&type=meetup-join&deeplinkId=f3a3a6e1-1696-4127-8ce4-912aadce5258&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true", "_blank");

  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }







}

// interface MyEvent extends CalendarEvent {
//   foo: string;
// }
// events: MyEvent[] = [{
//   title: 'title',
//   start: new Date(),
//   color: {primary: '', secondary: ''},
//   foo: 'bar'
// }]

