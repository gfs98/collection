import Mock from 'mockjs';
import UrlParamHash from '@/utils/params';
import data from './data/data.json';
import conditions from './data/conditions.json';
import departments from './data/departments.json';
import employees from './data/employees.json';
import roles from './data/roles.json';
import form from './data/form.json';
Mock.mock('/getNodeInfo', { 
    data, 
});
Mock.mock(/\/getConditions/, { 
    conditions, 
});
Mock.mock(/\/getDepartments/, 'get', (options)=>{
    // console.log(options.url)
    let params=UrlParamHash(options.url)
    let filterData=JSON.parse(JSON.stringify(departments.data.childDepartments))
    let newData
    if(params.parentId){
        newData=filterData.filter(item=>{
            return item.parentId==params.parentId
        })
    }else if(params.searchName){
        newData=filterData.filter(item=>{
            return item.departmentName.includes(params.searchName)
        })
    }else{
        newData=filterData
    }
    
    return {
        data:{
            childDepartments:newData
        }
    }
});
Mock.mock(/\/getEmployees/, 'get', (options)=>{
    console.log(options)
    return employees
});
Mock.mock(/\/getRoles/, 'get', (options)=>{
    console.log(options)
    return roles
});
Mock.mock(/\/getForm/, 'get', (options)=>{
    console.log(options)
    return form
});