import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router'
import { ISlimScrollOptions } from 'ngx-slimscroll';
import { ApiService } from '../api.service';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  opts: ISlimScrollOptions;
  public url;
  url2;
  employeeView: boolean = false;
  clientView :boolean = false;
  chatView :boolean = false;
  mailView :boolean = false;
  messageView :boolean = false;
  composeView :boolean = false;
  settingsView :boolean = false;
  callView :boolean = false;
  taskView :boolean = false;
  admin: boolean = false;
  employee: boolean = false;



  constructor(private api: ApiService, private location:Location,private router: Router, private activatedRoute: ActivatedRoute,private renderer:Renderer2) {

    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {

        $(".modal").modal("hide");
        //console.log(event.url);
      }

      if (event instanceof NavigationEnd) {
        this.url = event.url.split('/')[1];
        this.url2 = event.url.split('/')[2];
        //console.log(event.url);
        //console.log(this.url);
        //console.log(this.url2);

        let height = $(window).height();
        $(".page-wrapper").css("min-height", height);

        $(".main-wrapper").removeClass('slide-nav-toggle');
        $('#chat_sidebar').removeClass('opened');
        $('.sidebar-overlay').removeClass('opened');
        $('.task-overlay').removeClass('opened');

        if(this.url == 'settings')
        {
          this.clientView  = false;
          this.chatView  = false;
          this.mailView  = false;
          this.settingsView = true;
          this.messageView = false;
          this.composeView = false;
          this.callView = false;
          this.taskView = false;
        }
        else if(this.url == 'chat')
        {
          this.clientView  = false;
          this.chatView  = true;
          this.mailView  = false;
          this.settingsView = false
          this.messageView = false;
          this.composeView = false;
          this.callView = false;
          this.taskView = false;
        }
        else if(this.url == 'calls')
        {
          this.clientView  = false;
          this.chatView  = false;
          this.mailView  = false;
          this.settingsView = false
          this.messageView = false;
          this.composeView = false;
          this.callView = true;
          this.taskView = false;
        }
        else if(this.url == 'tasks')

        {
          this.clientView  = false;
          this.chatView  = false;
          this.mailView  = false;
          this.settingsView = false
          this.messageView = false;
          this.composeView = false;
          this.callView = false;
          this.taskView = true;
        }
        else if(this.url == 'inbox')
        {
          this.clientView  = false;
          this.chatView  = false;
          this.mailView  = true;
          this.settingsView = false;
          this.messageView = false;
          this.composeView = false;
          this.callView = false;
          this.taskView = false;
              if(this.url2 == 'compose')
              {
                this.clientView  = false;
                this.chatView  = false;
                this.mailView  = false;
                this.settingsView = false;
                this.messageView = false;
                this.composeView = true;
                this.callView = false;
                this.taskView = false;
              }
              else if(this.url2 == 'view')
              {
                this.clientView  = false;
                this.chatView  = false;
                this.mailView  = false;
                this.settingsView = false;
                this.messageView = true;
                this.composeView = false;
                this.callView = false;
                this.taskView = false;
              }
        }
        else if(this.url == 'dashboard'){
          this.clientView  = true;
          this.chatView  = false;
          this.mailView  = false;
          this.settingsView = false;
          this.messageView = false;
          this.composeView = false;
          this.callView = false;
          this.taskView = false;
        }
        else
        {
          this.clientView  = false;
          this.chatView  = false;
          this.mailView  = false;
          this.settingsView = false;
          this.messageView = false;
          this.composeView = false;
          this.callView = false;
          this.taskView = false;
        }
      }

      if (event instanceof NavigationError) {
        //console.log(event.error);
      }
    });

  }

  ngOnInit() {
    this.opts = {
      barBackground: '#ccc',
      gridBackground: 'transparent',
      barOpacity: '0.4',
      barBorderRadius: '6',
      barWidth: '6',
      gridWidth: '0',
      alwaysVisible: false,
      //height:'100%'
    }

    let user = localStorage.getItem('user');

    console.log(localStorage.getItem("type"));

    if(localStorage.getItem("type") == "employee"){
      this.employeeView = true;
    }else{

    }



    var h=$(window).height()-60;
    $('.slimscroll-wrapper').height(h);

    $(window).resize(function(){
    var h=$(window).height()-60;
    $('.slimscroll-wrapper').height(h);
    });

  }


}

