import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import OpenSansBold from '../../../../font/OpenSans-Bold.ttf'
import OpenSansRegular from '../../../../font/OpenSans-Regular.ttf'
import OpenSansBoldItalic from '../../../../font/OpenSans-BoldItalic.ttf'
import { convertPrice , convertPaymentMethod , convertDeliveryMethod, convertPriceWithoutVND } from "../../../../services/FeatureService";
Font.register({
    family: 'OpenSans',
    fonts:[
        { src: OpenSansRegular, fontWeight: 'normal' },
        { src: OpenSansBold, fontWeight: 'bold' },
        { src: OpenSansBoldItalic , fontWeight : "italic"},
    ]
})
// Define styles
const styles = StyleSheet.create({
    page: {
      fontFamily: 'OpenSans',
      padding: 8,
    },
    title: {
      fontSize: 18,
      textAlign: 'center',
      fontWeight:"bold",
      marginBottom: 1,
    },
    bullet: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: 'black',
        marginRight: 5,
    },
    text: {
        fontFamily: 'Arial',
        fontSize: 12,
    },
    rightAlignedText: {
        fontSize:11,
        marginLeft:'auto',
    },
    dottedLine: {
      width: '100%',
      borderTop: 1,
      borderColor: 'black',
      marginTop: 10,
    },
    table: {
      display: 'table',
      width: 'auto',
      marginRight:10,
      marginTop: 10,
      marginBottom: 10,
    },
    tableRow: {
      width:'98vw',
      margin:'auto',
      flexDirection: 'row',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tableCellBold: {
      textAlign:'center',
      width:'100%',
      fontSize:'14',
      fontWeight:'bold',
      borderWidth: 1,
      borderColor: 'black',
      padding: 5,
    },
    tableCell: {
      textAlign:'center',
      width:'100%',
      fontSize:'12',
      fontWeight:'bold',
      borderWidth: 1,
      borderColor: 'black',
      padding: 5,
    },
    tableHeader: {
      backgroundColor: '#CCCCCC',
      fontWeight: 'bold',
    },
    totalRow: {
      fontWeight: 'bold',
    },
  });
const Pdf = ({order}) => {
    const renderTableRow = (rowData) => (
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            {rowData.stt}
          </Text>
          <Text style={styles.tableCell}>
            {rowData.tenSanPham}
          </Text>
          <Text style={styles.tableCell}>
            {convertPriceWithoutVND(rowData.soLuong)}
          </Text>
          <Text style={styles.tableCell}>
            {convertPrice(rowData.donGia)}
          </Text>
          <Text style={styles.tableCell}>
            {convertPrice(rowData.thanhTien)}
          </Text>
        </View>
      );
    return (
        <Document>
        <Page size="A4" style={styles.page}>
            {/* Title */}
            <Text style={styles.title}>HÓA ĐƠN BÁN HÀNG</Text>
            
            {/* Date */}
            <Text style={styles.rightAlignedText}>Ngày: ______ / ______ / ______</Text>
            
            <View style={{marginTop:'20'}}>
                <View style={{flexDirection:"row",alignItems:'center'}}>
                    <View style={{width:"5px",height:"5px",borderRadius:"100%",backgroundColor:'black'}}></View>
                    <Text style={{fontSize:"11",marginLeft:"5"}}>Tên khách hàng:</Text>
                    <Text style={{fontSize:"10"}}>{order?.hoTenKhachHang}</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:'center',marginTop:'3'}}>
                    <View style={{width:"5px",height:"5px",borderRadius:"100%",backgroundColor:'black'}}></View>
                    <Text style={{fontSize:"11",marginLeft:"5"}}>Email khách hàng:</Text>
                    <Text style={{fontSize:"10"}}>{order?.emailKhachHang}</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:'center',marginTop:'3'}}>
                    <View style={{width:"5px",height:"5px",borderRadius:"100%",backgroundColor:'black'}}></View>
                    <Text style={{fontSize:"11",marginLeft:"5"}}>Phương thức thanh toán:</Text>
                    <Text style={{fontSize:"10"}}>{convertPaymentMethod(order?.phuongThucThanhToan)}</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:'center',marginTop:'3'}}>
                    <View style={{width:"5px",height:"5px",borderRadius:"100%",backgroundColor:'black'}}></View>
                    <Text style={{fontSize:"11",marginLeft:"5"}}>Phương thức vận chuyển:</Text>
                    <Text style={{fontSize:"10"}}>{convertDeliveryMethod(order?.phuongThucVanChuyen)}</Text>
                </View>
            </View>
            {/* Table */}
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellBold}>
                  STT
                </Text>
                <Text style={styles.tableCellBold}>
                  TÊN SẢN PHÂM
                </Text>
                <Text style={styles.tableCellBold}>
                  SỐ LƯỢNG
                </Text>
                <Text style={styles.tableCellBold}>
                  ĐƠN GIÁ
                </Text>
                <Text style={styles.tableCellBold}>
                  THÀNH TIỀN
                </Text>
              </View>
                {
                  order?.danhSachCTDH.map((detail,index)=>{
                    return (
                      renderTableRow({...detail,stt:index})
                    )
                  })
                }
                  <Text style={{textAlign:'center',width:'98vw',fontSize:'12',fontWeight:'bold',borderWidth: 1,borderColor: 'black',padding: 5}}>
                    Tổng : {convertPrice(order?.tongGiaTri)}
                  </Text>
            </View>
            
            {/* Chữ ký */}
            <View style={{flexDirection:"row",alignItems:'center',marginTop:'40',justifyContent:'space-evenly'}}>
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{fontSize:'14',fontWeight:'bold',display:'inline-block',textAlign:'center'}}>KHÁCH HÀNG</Text>
                  <Text style={{fontSize:'8',display:'inline-block',textAlign:'center'}}>ký và ghi rõ họ tên </Text>
                </View>
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{fontSize:'14',fontWeight:'bold',display:'inline-block',textAlign:'center'}}>NGƯỜI NHẬN HÀNG</Text>
                  <Text style={{fontSize:'8',display:'inline-block',textAlign:'center'}}>ký và ghi rõ họ tên</Text>
                </View>
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{fontSize:'14',fontWeight:'bold',display:'inline-block',textAlign:'center'}}>NHÂN VIÊN KẾ TOÁN</Text>
                  <Text style={{fontSize:'8',display:'inline-block',textAlign:'center'}}>ký và ghi rõ họ tên</Text>
                </View>
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{fontSize:'14',fontWeight:'bold',display:'inline-block',textAlign:'center'}}>GIÁM ĐỐC</Text>
                  <Text style={{fontSize:'8',display:'inline-block',textAlign:'center'}}>ký và ghi rõ họ tên</Text>
                </View>
            </View>
        </Page>
      </Document>
    )
}
export default Pdf;