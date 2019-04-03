/**
 * Created by Administrator on 2018/10/26.
 */
document.writeln('<script src="http://www.cddgg.com/com_code/layer/layer.js"></script>');


/*-----------------------------------*\
 留言功能
 \*-----------------------------------*/

/*
 *direction：1、2、3、4 对应上右下左
 *tips：提示内容
 *
 */
function validator_msg(attr, bool) {
    var default_options = {
        'name': {'direction': 3, 'tips': '请输入您的姓名'},
        'tel': {'direction': 3, 'tips': '请输入您的电话'},
        'sex': {'direction': 3, 'tips': '请选择性别'},
        'content': {'direction': 3, 'tips': '请输入你的内容'}
    };
    var v_name = $(attr + " input[name='info[name]']");
    var v_tel = $(attr + " input[name='info[tel]']");
    var v_content = $(attr + " input[name='info[content]']");
    var v_name_direction, v_name_tips, v_tel_direction, v_tel_tips, v_content_direction, v_content_tips;

    if (!/^[\u4e00-\u9fa5]{1,}$/.test(v_name.val())) {

        if (typeof(v_name.attr('direction')) == 'undefined' || v_name.attr('direction') == '') {
            v_name_direction = default_options.name.direction;
        } else {
            v_name_direction = v_name.attr('direction');
        }

        if (typeof(v_name.attr('tips')) == 'undefined' || v_name.attr('tips') == '') {
            v_name_tips = default_options.name.tips;
        } else {
            v_name_tips = v_name.attr('tips');
        }
        layer.tips(v_name_tips, v_name, {tips: v_name_direction});
        return 0;
    }

    //if(typeof(v_content.val()) != 'undefined'){
    //    if(!/^[\u4e00-\u9fa5]{1,}$/.test(v_content.val()) && !/^[1-9]\d*$/.test(v_content.val())){
    //        if( typeof(v_content.attr('direction'))=='undefined' || v_content.attr('direction')=='' ){
    //            v_content_direction = default_options.content.direction;
    //        }else{
    //            v_content_direction = v_content.attr('direction');
    //        }
    //
    //        if( typeof(v_content.attr('tips'))=='undefined' || v_content.attr('tips')=='' ){
    //            v_content_tips = default_options.content.tips;
    //        }else{
    //            v_content_tips = v_content.attr('tips');
    //        }
    //        layer.tips(v_content_tips, v_content ,{tips:v_content_direction} );
    //        return 0;
    //    }
    //}

    if (!/^(1)[3,4,5,7,8][0-9]{9}$/.test(v_tel.val())) {
        if (typeof(v_tel.attr('direction')) == 'undefined' || v_tel.attr('direction') == '') {
            v_tel_direction = default_options.tel.direction;
        } else {
            v_tel_direction = v_tel.attr('direction');
        }

        if (typeof(v_tel.attr('tips')) == 'undefined' || v_tel.attr('tips') == '') {
            v_tel_tips = default_options.tel.tips;
        } else {
            v_tel_tips = v_tel.attr('tips');
        }
        layer.tips(v_tel_tips, v_tel, {tips: v_tel_direction});
        return 0;
    }
    return 1;

}

/*
 *提交信息
 *attr:包裹层属性
 *str: 业态|地区|设备|平台 如：工商|成都|移动端|小顶网 => gs|cd|wap|xdw     xdw=>小顶网  dgg=>
 *info:弹出消息框的内容,已设置默认值，传入该参数则表示自定义弹出消息
 *info:为1时则不弹出消息框 submit_msg(attr,str,1)
 *调用示例：
 * onclick="submit_msg('#id','gs|cd|wap|xdw')"
 * onclick="submit_msg('.className','gs|cd|wap|xdw')"
 * onclick="submit_msg('[attr=value]','gs|cd|wap|xdw')"
 */
function submit_msg(attr, str, info) {


    //初始检测对象是否存在
    if ($(attr).length <= 0) {
        layer.msg('参数错误：对象不存在');
        return false;
    }

    //检测是否存在多个ID、class及属性
    if (attr.indexOf('#') > -1) {
        var idStr = attr.substring(attr.indexOf('#') + 1);
        if ($('[id=' + idStr + ']').length > 1) {
            layer.msg('参数错误：存在相同ID');
            return false;
        }
    } else {
        if ($(attr).length > 1) {
            layer.msg('参数错误：存在相同CLASS或属性');
            return false;
        }
    }

    var info = info || '您的信息已提交成功，稍后请注意接听电话';
    if (validator_msg(attr, 1)) {

        var name = $(attr + " input[name='info[name]']").val();
        var tel = $(attr + " input[name='info[tel]']").val();
        var sex = $(attr + " input[name='info[sex]']:checked").val();
        if (typeof(sex) == 'undefined') {
            sex = '';
        }
        var content = $(attr + " input[name='info[content]']").val();
        if (typeof(content) == 'undefined') {
            content = '无内容信息';
        }
       
            var strObj = str.split("|");
            var msgData = {
                "name": name + sex,
                "tel": tel,
                "content": content,
                "type": strObj[0],
                "place": strObj[1],
                "device": strObj[2],
                "web": strObj[3]
            };

            $.ajax({
                //url: 'http://172.16.1.6:8085/api/consult/add.do',
               // url: 'http://admin.dggjqw.com/api/consult/add.do',
                url: 'http://zyzx.dgg.net/api/consult/adddo',
                timeout: 5000,
                type: 'get',
                data: msgData,
                dataType: 'JSONP',
                jsonp: 'callback',
                success: function (data) {
                    $(attr + " input[name='info[name]']:not(:hidden)").val('');
                    $(attr + " input[name='info[tel]']").val('');
                    if (!data.error) {
                        if (info && info != 1) {

                            layer.msg(info);
                        }

                    } else {
                        layer.msg(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    layer.msg('您的信息已提交成功，稍后请注意接听电话');
                }

            });

        return true;
    }
}


