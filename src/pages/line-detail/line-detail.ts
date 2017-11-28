import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { ProductService } from '../../providers/productService';
import { DateTimeHelper } from '../../providers/utils';
import { UesChatPage } from '../ues-chat/ues-chat';
import { SupplierStorePage } from '../supplier-store/supplier-store';
import { BasePage } from '../../providers/basePage';
import { LoadCtrl } from '../../providers/loadingController';
import { AccountService } from '../../providers/accountService';
import { CalendarModal, CalendarModalOptions, DayConfig } from "ion2-calendar";

@IonicPage()
@Component({
  selector: 'page-line-detail',
  templateUrl: 'line-detail.html',
  providers: [ProductService, DateTimeHelper, LoadCtrl]
})

export class LineDetailPage extends BasePage {

  lineModel = "lineCharacteristic";
  info: any = {};
  _daysConfig: any = [];
  input: any = {};
  isShowShare: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductService,
    private loading: LoadCtrl,
    private modalCtrl: ModalController,
    private dateTimeHelper: DateTimeHelper) {
    super();
    this.init();
  }

  private init() {
    let productId = this.navParams.get('Id');
    if (productId) {

      this.loading.show();
      this.productService.getLine(productId).then(response => {
        if (response.Success) {
          this.loading.hide();
          this.info = response.Result;
          this.getMinPrice();
          this.info = this.setDefaultSlideImg(this.info);
          this.setPriceOfCalendar();
          this.setInputInfo();
          this.uutShareInit(this.info.SupplierId, this.info.ProductId, this.info.ProductName, 'line', this.info.Images.length > 0 ? this.info.Images[0].Path : '');
        }
      }).catch();
    }
  }

  public showShareLoading() {
    this.loading.showShareLoading();
  }

  private getMinPrice() {
    if (this.info.UseDates.length > 0) {
      let minPrice = this.info.UseDates[0].MinPrice;
      this.info.UseDates.forEach(element => {
        if (element.MinPrice < minPrice) minPrice = element.MinPrice;
      });
      // console.log(minPrice);
      this.info.MinPrice = minPrice;
    }
  }

  openCalendar() {
    // this.calendarCtrl.openCalendar({
    //   isRadio: true,
    //   weekdaysTitle: ['日', '一', '二', '三', '四', '五', '六'],
    //   monthTitle: "yyyy 年 MM 月",
    //   title: "选择日期",
    //   closeLabel: "取消",
    //   daysConfig: this._daysConfig
    // }).then(res => {
    //   this.onSelectDate(res);
    // }).catch((err) => {
    //   // console.log("没有选择");
    // });

    const options: CalendarModalOptions = {
      title: '选择日期',
      color: 'primary',
      pickMode: 'single',
      monthFormat: 'YYYY 年 MM 月 ',
      weekdays: ['天', '一', '二', '三', '四', '五', '六'],
      closeLabel: '取消',
      doneLabel: '完成',
      autoDone: true,
      daysConfig: this._daysConfig
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    myCalendar.present();
    myCalendar.onDidDismiss(date => {
      this.onSelectDate(date);
    });
  }

  private onSelectDate(dateObj: any) {
    if (!dateObj) return;
    let date = new Date(dateObj.time);
    let productQuote = this.getTargetDayQuote(date);
    if (productQuote) {
      this.setInputQuote(productQuote);
      this.navCtrl.push(OrderPage, { input: this.input });
    }
  }

  private getTargetDayQuote(date: any) {
    let quote: any = '';
    this.info.UseDates.forEach(element => {
      if (this.dateTimeHelper.isSameDay(date, new Date(element.Date))) {
        quote = element;
      }
    });
    return quote;
  }

  private setInputQuote(productDate: any) {
    if (productDate) {
      this.input.OrderProductListInput[0].OrderProductDateListInput[0].DateId = productDate.DateIdFromProductCenter;
      this.input.OrderProductListInput[0].OrderProductDateListInput[0].date = productDate.Date;
      let quoteList = [];
      productDate.PriceItems.forEach(item => {
        let quote = {
          name: item.Name,
          price: item.PeerPrice,
          currency: this.info.CurrencyCode,
          QuoteId: item.QuoteIdFromProductCenter,
          PriceType: item.IsAdditionItem ? 1 : 0,
          Quantity: 1,
          remainingSeats: item.IsCountLimited ? ('余' + item.RestCount) : '有位'
        };
        quoteList.push(quote);
      });
      this.input.OrderProductListInput[0].OrderProductDateListInput[0].OrderProductDateQuoteListInput = quoteList;
    }
  }

  private setPriceOfCalendar() {

    this.info.UseDates.forEach(element => {
      let item: DayConfig = {
        date: new Date(element.Date),
        subTitle: element.MinPrice,
        cssClass: 'dayclass'
      };
      this._daysConfig.push(item);
    });

  }

  private setInputInfo() {
    this.input = {
      PeerMallOrderInfoInput: {
        OrderType: 2,
        // OccupiedType: 1,
        ContactName: '',
        ContactPhone: '',
        ContactEmail: '',
        // InvoiceType: 0,
        Invoice: {
          IsActive: false
        },
        Shipping: {
          IsActive: false
        },

        currencyCode: this.info.CurrencyCode,
        location: this.info.Location,
        supplierId: this.info.SupplierId,
        supplierName: this.info.SupplierName
      },
      OrderProductListInput: [{
        ProductId: this.info.ProductId,
        ProductName: this.info.ProductName,
        OrderProductDateListInput: [{
          DateId: 0,
          date: '',
          OrderProductDateQuoteListInput: []
        }]
      }],
      OrderVisitorListInput: []
    };
  }

  booking(productDate: any) {
    this.setInputQuote(productDate);
    // console.log(this.input);
    this.navCtrl.push(OrderPage, { input: this.input });
  }

  uesConsult() {
    if (!this.info.ProductId) return;
    this.navCtrl.push(UesChatPage, {
      consult: {
        productType: '线路',
        productId: this.info.ProductId,
        productUrl: window.location.href.replace(window.location.search, "") + '?ptype=line&pid=' + this.info.ProductId,
        onlyGetContactUserId: true
      }
    });
  }

  goSupplyStore() {
    if (this.info.SupplierId)
      this.navCtrl.push(SupplierStorePage, { supplierId: this.info.SupplierId });
  }



  shareBtnClick() {
    if (!this.info.SupplierId) return;
    if (AccountService.CurrentUserInfo.AgencyId != this.info.SupplierId) {
      this.loading.showShareLoading();
      this.uutShareRetail(this.info.ProductId, this.info.ProductName, 'line', this.info.Images.length > 0 ? this.info.Images[0].Path : '');
    } else {
      this.isShowShareCpm = true;
    }
  }
  peerShare() {
    if (!this.info.ProductId) return;
    this.loading.showShareLoading();
    this.uutSharePeer(this.info.ProductId, this.info.ProductName, 'line', this.info.Images.length > 0 ? this.info.Images[0].Path : '');
  }
  retailShare() {
    if (!this.info.ProductId) return;
    if (this.info.PublishType == 1) return;
    this.loading.showShareLoading();
    this.uutShareRetail(this.info.ProductId, this.info.ProductName, 'line', this.info.Images.length > 0 ? this.info.Images[0].Path : '');
  }

}
