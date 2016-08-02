define(function(require, exports, module) {

            var Http = require('U/http');

            var forget = new Vue({
                el: '#myHome',
                template: _g.getTemplate('me/myHome-body-V'),
                data: {
                    myBusiness: '../../image/me/mybusiness.png',
                    myCompany: '../../image/me/mycompany.png',
                    myStore: '../../image/me/mystore.png',
                    isBusiness: false,
                    isCompany: true,
                    isStore: false,
                    headerTopText: '',
                    headerBottomText: '',
                    isMyCommission: true,
                    isMyNewClien: true,
                    // isMySetting:true,
                    isMyCommissionImg: '../../image/me/ticheng.png',
                    isMyNewClienImg: '../../image/me/new_costomer.png'
                },
                methods: {
                    onCommissionTap: function() {
                        _g.openWin({
                            header: {
                                data: {
                                    title: '我的提成'
                                },
                                template: '../html/me/myCommission-header-V'
                            },
                            name: 'me-commission',
                            url: '../me/commission.html?mod=dev'
                        });
                    },
                    newClienTap: function() {
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
                    onSettingTap: function() {
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
            var getData = function() {
                Http.ajax({
                    data: {},
                    url: '/app/auth/page/fxUser/getBusinessOrganInfo.do',
                    success: function(ret) {
                        if (ret.code == 200) {
                            forget.isBusiness = false;
                            forget.isCompany = false;
                            forget.isStore = false;
                            if (ret.object.posOrgType == '001') {
                                forget.isCompany = true;
                                forget.headerTopText = 'org_code';
                                forget.headerBottomText = 'staff_pos_name';
                            } else if (ret.object.posOrgType == '002') {
                                forget.isStore = true;
                                forget.headerTopText = 'org_code';
                                forget.headerBottomText = 'staff_pos_name';
                            } else if (ret.object.posOrgType == '003') {
                                forget.isBusiness = true;
                                forget.headerTopText = 'org_code';
                                forget.headerBottomText = 'staff_pos_name';
                            }
                        } else {
                            _g.toast(ret.message);
                        }
                    },
                    error: function(err) {},
                });
            };
            getData();
            module.exports = {};
        });
