export const convertPrice = (price) =>{
    if(price){
        var strAmount = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // Thêm đơn vị tiền tệ 'VND' vào sau chuỗi số
        return strAmount + " VND";
    }
    return ""
}
export const convertPriceWithoutVND = (price) =>{
    if(price){
        var strAmount = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // Thêm đơn vị tiền tệ 'VND' vào sau chuỗi số
        return strAmount
    }
}
export const convertOrderStatus = (status)=>{
    if(status){
        if(status === "ChoDuyet"){
            return "Chờ Duyệt";
        }else if(status === "DaDuyet"){
            return "Đã Duyệt";
        }else if(status === "Huy"){
            return "Hủy";
        }else{
            return "Giao Thành Công";
        }
    }
    return ""
}
export const formatDateMMDDYYYY=(inputDate)=>{
    const parts = inputDate.split('/');
    if (parts.length !== 3) return null;
  
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
  
    // Kiểm tra xem ngày, tháng, năm có đúng không
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  
    // Chuyển đổi thành dạng MM/dd/yyyy
    return `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`;
  }
export const convertStatusOrder = (status) => {
    if(status === "Huy"){
        return "Hủy ";
    }else if(status === "DaDuyet"){
        return "Đã duyệt ";
    }else{
        return "Giao thành công ";
    }
}
export const convertPaymentMethod = (method) => {
    if(method){
        if(method === "TienMat"){
            return "Tiền Mặt";
        }else{
            return "Chuyển Khoản";
        }
    }
    return ""
}
export const convertDeliveryMethod = (method) => {
    if(method === "ChuyenPhatNhanh"){
        return "Chuyển Phát Nhanh";
    }else{
        return "Giao Hàng Tiết Kiệm";
    }
}
export const formatDate = (dateString) => {
    if(dateString){
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }else{
        return ""
    }
};
export const formatBirthDate = (dateString) => {
    if(dateString){
        const date = new Date(dateString);
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth()+1}`:date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }else{
        return ""
    }
}
export const convertDataSpend = (rawData) => {
    let analyst = {
        total:0,
        totalPending:0,
        totalDeny:0,
        totalSuccess:0,
        totalConfirm:0,
        data:{
            labels:[],
            datasets:[
                {
                    label: 'Confirm',
                    data: [],
                    fill: false,
                    borderColor: '#3498db',
                },
                {
                    label: 'Deny',
                    data: [],
                    fill: false,
                    borderColor: '#e91e63',
                },
                {
                    label: 'Success',
                    data: [],
                    fill: false,
                    borderColor: '#8bc34a',
                },
                {
                    label: 'Pending',
                    data: [],
                    fill: false,
                    borderColor: 'rgb(174 0 203)',
                },
            ]
        }
    }
    for(let i = 0 ; i < rawData.length ;i++){
        const raw = rawData[i]
        analyst.data.labels.push(raw.ngayThongKe)
        const length = analyst.data.datasets[0].data.length
        for(let j = 0 ; j < raw.danhSachTrangThaiVaSoLuong.length ;j++){
            const item = raw.danhSachTrangThaiVaSoLuong[j]
            if(item.trangThai === "Huy"){
                analyst.total += item.soLuong
                analyst.totalDeny += item.soLuong
                analyst.data.datasets[1].data[length-1]+=item.soLuong
            }else if(item.trangThai === "ChoDuyet"){
                analyst.total += item.soLuong
                analyst.totalPending += item.soLuong
                analyst.data.datasets[3].data[length-1]+=item.soLuong
            }else if(item.trangThai === "DaDuyet"){
                analyst.total += item.soLuong
                analyst.totalConfirm += item.soLuong
                analyst.data.datasets[0].data[length-1]+=item.soLuong
            }else if(item.trangThai === "GiaoThanhCong"){
                analyst.total += item.soLuong
                analyst.totalSuccess += item.soLuong
                analyst.data.datasets[2].data[length-1]+=item.soLuong
            }else{

            }
        }
    }
    return analyst
}
export const convertDataOrdersAnalyst = (rawData) => {
    let analyst = {
        total:0,
        totalPending:0,
        totalDeny:0,
        totalSuccess:0,
        totalConfirm:0,
        data:{
            labels:[],
            datasets:[
                {
                    label: 'Confirm',
                    data: [],
                    fill: false,
                    borderColor: '#3498db',
                },
                {
                    label: 'Deny',
                    data: [],
                    fill: false,
                    borderColor: '#e91e63',
                },
                {
                    label: 'Success',
                    data: [],
                    fill: false,
                    borderColor: '#8bc34a',
                },
                {
                    label: 'Pending',
                    data: [],
                    fill: false,
                    borderColor: 'rgb(174 0 203)',
                },
            ]
        }
        
    }
    for(let i = 0 ; i < rawData.length ;i++){
        const raw = rawData[i]
        analyst.data.labels.push(raw.ngayDatDon)
        analyst.data.datasets[0].data.push(0)
        analyst.data.datasets[1].data.push(0)
        analyst.data.datasets[2].data.push(0)
        analyst.data.datasets[3].data.push(0)
        const length = analyst.data.datasets[0].data.length
        for(let j = 0 ; j < raw.danhSachTrangThaiVaSoLuong.length ;j++){
            const item = raw.danhSachTrangThaiVaSoLuong[j]
            if(item.trangThai === "Huy"){
                analyst.total += item.soLuong
                analyst.totalDeny += item.soLuong
                analyst.data.datasets[1].data[length-1]+=item.soLuong
            }else if(item.trangThai === "ChoDuyet"){
                analyst.total += item.soLuong
                analyst.totalPending += item.soLuong
                analyst.data.datasets[3].data[length-1]+=item.soLuong
            }else if(item.trangThai === "DaDuyet"){
                analyst.total += item.soLuong
                analyst.totalConfirm += item.soLuong
                analyst.data.datasets[0].data[length-1]+=item.soLuong
            }else if(item.trangThai === "GiaoThanhCong"){
                analyst.total += item.soLuong
                analyst.totalSuccess += item.soLuong
                analyst.data.datasets[2].data[length-1]+=item.soLuong
            }else{

            }
        }
    }
    return analyst
}