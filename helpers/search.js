module.exports = (query) =>{
    let objSearch ={
       
        keyword: ""
    }
    if (query.keyword) {
        objSearch.keyword = query.keyword;
        // Tạo biểu thức chính quy để tìm kiếm các name chứa keyword (không phân biệt chữ hoa chữ thường)
        objSearch.regex = { $regex: new RegExp(query.keyword, "i") };
    }
    return objSearch;
}