define(function(require, exports, module) {
    var header = _g.addHeader({
        data: {
            title: _g.getLS('UserEntity').pos_org_name,
            rightText: ''
        },
        template: '../html/me/myCommission-header-V',
        methods: {
            onAddNewClienTap: function() {
                _g.openWin({
                    header: {
                        data: {
                            title: '新客开发'
                        }
                    },
                    name: 'me-newClienCommission',
                    url: '../me/newClienCommission.html'
                });
            },
            onSalesSettingRightBtn: function() {
                _g.openWin({
                    header: {
                        data: {
                            title: '设置'
                        }
                    },
                    name: 'me-setting',
                    url: '../me/setting.html?mod=dev'
                });
            }
        }
    });
    var Http = require('U/http');

    var commissionBody = new Vue({
        el: '#commission',
        template: _g.getTemplate('me/commission-body-V'),
        data: {
            commission:{
              this_total_kpi_price: 1000,
              last_total_kpi_price: 2000,
            },
        list:[{
            kpi_no: 'thbk123078',
            bar_code: '99875',
            kpi_price: -6000,
            kpi_time: '2016-7-30',
            kpi_type: '单品提成'
          },{
              kpi_no: 'thbk123078',
              bar_code: '99875',
              kpi_price: 6000,
              kpi_time: '2016-7-30',
              kpi_type: '单品提成'
            },{
                kpi_no: 'thbk123078',
                bar_code: '99875',
                kpi_price: -6000,
                kpi_time: '2016-7-30',
                kpi_type: '单品提成'
              },],
        },
        created:function(){
          this.list = [];
        },
        methods: {
            onDetailTap: function() {
                _g.openWin({
                    header: {
                        data: {
                            title: '提成明细'
                        }
                    },
                    name: 'me-commissionDetail',
                    url: '../me/commissionDetail.html'
                });
            }
        }
    });
var getData = function(){
    Http.ajax({
       data:{},
       isSync:true,
       url:'/app/auth/page/kpi/list.do',
       success:function(ret){
         if (ret.code == 200){
          setTimeout(function(){
            var dt = ret.object;
            if(dt){
              commissionBody.commission = getDataThisPrice(dt);
              commissionBody.list = getDataListVue(dt);
            }
          },0);
          console.log(commissionBody);
        }else{
          _g.toast(ret.massage);
        }
       },
       error:function(err){},
    });
};
var getDataThisPrice = function(result){
  return{
    this_total_kpi_price: result?result.this_total_kpi_price:000,
    last_total_kpi_price: result?result.last_total_kpi_price:000,
  }
};
var getDataListVue = function(result){
  var list = result?result.kpiSalesList:[];
  return _.map(list,function(item){
    return{
      bar_code:item?item.bar_code:'',
        kpi_name:item?item.kpi_name:'',
        kpi_no:item?item.kpi_no:'',
        kpi_price:item?item.kpi_price:000,
        kpi_time:item?item.kpi_time:'',
        kpi_type:item?item.kpi_type:''
    }
  });
}
getData();
    module.exports = {};
});
