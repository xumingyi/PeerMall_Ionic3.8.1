import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySymbolPipe',
})
export class CurrencySymbolPipe implements PipeTransform {

  transform(value: string, ...args) {
    if (!value) return;
    let symbols = {
      AED: 'د.إ.‏',
      AFN: '؋',
      ALL: 'Lekë',
      AMD: '֏',
      ANG: 'Naf',
      AOA: 'Kz',
      ARS: '$',
      AUD: '$',
      AWG: 'Afl.',
      AZN: '₼',
      BAM: 'KM',
      BBD: '$',
      BDT: '৳',
      BGN: 'лв.',
      BHD: 'د.ب.‏',
      BIF: 'FBu',
      BMD: '$',
      BND: '$',
      BOB: 'Bs',
      BRL: 'R$',
      BSD: '$',
      BTN: 'Nu.',
      BWP: 'P',
      BYR: 'р.',
      BZD: '$',
      CAD: '$',
      CDF: 'FC',
      CHF: 'CHF',
      CLP: '$',
      CNY: '￥',
      COP: '$',
      CRC: '₡',
      CUC: '$',
      CUP: '$',
      CVE: '​',
      CZK: 'Kč',
      DJF: 'Fdj',
      DKK: 'kr',
      DOP: '$',
      DZD: 'DA',
      EGP: '£',
      ERN: 'Nfk',
      ETB: 'Br',
      EUR: '€',
      FJD: '$',
      FKP: '£',
      GBP: '£',
      GEL: '₾',
      GHS: 'GH₵',
      GIP: '£',
      GMD: 'D',
      GNF: 'FG',
      GTQ: 'Q',
      GYD: '$',
      HKD: 'HK$',
      HNL: 'L',
      HRK: 'kn',
      HTG: 'G',
      HUF: 'Ft',
      IDR: 'Rp',
      ILS: '₪',
      INR: '₹',
      IQD: 'د.ع.‏',
      IRR: 'ریال',
      ISK: 'kr',
      JMD: '$',
      JOD: 'د.أ.‏',
      JPY: '¥',
      KES: 'Ksh',
      KGS: 'сом',
      KHR: '៛',
      KMF: 'CF',
      KPW: '₩',
      KRW: '₩',
      KWD: 'د.ك.‏',
      KYD: '$',
      KZT: '₸',
      LAK: '₭',
      LBP: 'L£',
      LKR: 'Rs',
      LRD: '$',
      LSL: 'lLS',
      LYD: 'د.ل.‏',
      MAD: 'د.م.‏',
      MDL: 'L',
      MGA: 'Ar',
      MKD: 'den',
      MMK: 'K',
      MNT: '₮',
      MOP: 'MOP$',
      MRO: 'UM',
      MUR: 'Rs',
      MWK: 'MK',
      MXN: '$',
      MYR: 'RM',
      MZN: 'MTn',
      NAD: '$',
      NGN: '₦',
      NIO: 'C$',
      NOK: 'kr',
      NPR: 'Rs',
      NZD: '$',
      OMR: 'ر.ع.‏',
      PAB: 'B/.',
      PEN: 'S/.',
      PGK: 'K',
      PHP: '₱',
      PKR: 'ر',
      PLN: 'zł',
      PYG: '₲',
      QAR: 'ر.ق.‏',
      RSD: 'дин.',
      RUB: '₽',
      RWF: 'RF',
      SAR: 'ر.س.‏',
      SBD: '$',
      SCR: 'SR',
      SDG: 'ج.س.',
      SEK: 'kr',
      SGD: '$',
      SHP: '£',
      SLL: 'Le',
      SOS: 'S',
      SRD: '$',
      SSP: '£',
      STD: 'Db',
      SYP: '£',
      SZL: 'E',
      THB: '฿',
      TMT: 'ТМТ',
      TND: 'DT',
      TOP: 'T$',
      TRY: '₺',
      TTD: '$',
      TWD: '$',
      TZS: 'TSh',
      UAH: '₴',
      UGX: 'USh',
      USD: '$',
      UYU: '$',
      UZS: 'сўм',
      VEF: 'Bs',
      VND: '₫',
      VUV: 'VT',
      WST: 'WS$',
      XAF: 'FCFA',
      XCD: '$',
      XOF: 'CFA',
      XPF: 'CFP',
      YER: 'ر.ي.‏',
      ZAR: 'R',
      ZMW: 'K'
    };
    let val = symbols[value.toUpperCase()];
    return val ? val : value;
  }

}
