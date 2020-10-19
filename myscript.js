var global_string_of_debtors = "",
    global_string_of_permisson = "";

//Функция обработки текста из поля ввода по нажатию кнопки и вывод результат в поле вывода
function showtext() {
    let textA = document.querySelector(".inta"),                //Занесение в переменную указатель на объект поля ввода входных данных с классом .inta
    out_group = document.querySelector(".groupp"),              //Занесение в переменную указатель на объект поля вывода данных о группе с классом .group
    out_subj = document.querySelector(".subj"),                 //Занесение в переменную указатель на объект поля вывода данных о предмете с классом .subj
    out_theme = document.querySelector(".theme"),               //Занесение в переменную указатель на объект поля вывода данных о теме с классом .theme    
    out_missing = document.querySelector(".missing"),           //Занесение в переменную указатель на объект поля вывода данных о отсутствующих студентах с классом .missing
    in_button_text = document.querySelectorAll(".text_near_butt"),      //Указатель на текст у кнопок
    out_debtors = document.querySelector(".critical_debtors"),  //Поле списка критических должников
    out_permission = document.querySelector(".permission"),     //Поле списка студентов с допуском с разрешения бухгалтерии
    chk_debtors = document.querySelector("#chkbox_critical_debtors")    //Указатель на чекбокс критических должников
    chk_permission = document.querySelector("#chkbox_permission")       //Указатель на чекбокс разрешения бухгалтерии
    text1 = textA.value,                                        //Присвоение переменной содержмого объекта класса .inta
    gr_and_sub = [],                                            //Объявление массива для группы и предмета
    theme = "",                                                 //Объявление строчной переменной для темы               
    miss_stud = "",                                             //Объявление строчной переменной для отсутствующих студентов
    debtors = "",
    permission = "";
    
    if (text1 == ""){                                           //Если поле ввода пусто, выводим рядом с кнопкой сообщение
        in_button_text[0].innerHTML = '<p>Where is the data, <span class="red_text">Lebovski<span>?</p>';        
    } else {                                                    //Если поле ввода было не пусто
        in_button_text[0].innerHTML = '<p>Вот <span class="red_text">молодец</span>!</p>';  
    }

    gr_and_sub = find_group_and_subject(text1);                 //Поиск группы и предмета
    theme = find_theme(text1);                                  //Поиск темы
    miss_stud = find_miss_studs(text1);                         //Поиск отсутсвиующих студентов

    debtors = find_debtors(text1);
    global_string_of_debtors = debtors;
    permission = find_permission(text1);
    global_string_of_permisson = permission;

    load(miss_stud[1], gr_and_sub[2]);

    out_group.innerHTML = gr_and_sub[0];                        //Вывод найденной информации в соответствующие поля
    out_subj.innerHTML = gr_and_sub[1];
    out_theme.innerHTML = theme;
    out_missing.innerHTML = miss_stud[0];

    if ( chk_debtors.checked ){
        out_debtors.innerHTML = debtors;
        out_debtors.contentEditable = "true";
    }
    if ( debtors == "" ){
        out_debtors.contentEditable = "false";
    }

    if ( chk_permission.checked ){
        out_permission.innerHTML = permission;
        out_permission.contentEditable = "true";
    }
    if ( permission == "" ){
        out_permission.contentEditable = "false";
    }

}

//Функция поиска и обработки строки группы и предмета
function find_group_and_subject(all_text){                      
    let gr_and_subj_reg = /.+\(.+\)/,                           //Регулярка для поиска строки группы и предмета в формате "группа(предмет)"
    result = [],                                                //Массив для результатов поиска регулярным по всему тексту
    groupp = "",                                                //Группа
    groupp_for_log = "",
    subj = "";                                                  //Предмет

    result = all_text.match(gr_and_subj_reg);                   //поиск
    if (result != null){                                        //Если что-то нашли
        groupp_for_log = result[0].slice(0, result[0].indexOf("("));
        groupp = "Группа: " + result[0].slice(0, result[0].indexOf("("));       //Делим строку. До скобок - группа. В скобках - предмет
        subj = "Предмет: " + result[0].slice(result[0].indexOf("(") + 1, (-1));
    } else {                                                    //Если не нашли
        groupp = "Группа: данных не найдено";                           
        subj = "Предмет: данных не найдено";
    }
    return [groupp, subj, groupp_for_log];
}

//Функция поиска и обработки темы ленты
function find_theme(all_text){                                  
    let theme = "",                                             //Переменная для найденной темы
    theme_reg = /Тема урока .+ mode_edit/,                      //Регулярное в формате "Тема урока какой-то текст mode_edit"
    result = [];                                                //Массив для результатов поиска регулярным по всему тексту

    result = all_text.match(theme_reg);
    if (result != null){                                        //Если что-то нашли
        //Делим строку. Извлекаем текст между "Тема урока " и " mode_edit"
        theme = "Тема урока: " + result[0].slice(result[0].indexOf("Тема урока ") + "Тема урока ".length, result[0].indexOf(" mode_edit"));    
    } else {                                                    //Если не нашли
        theme = "Тема урока: данных не найдено";                           
    }
    return theme;
}

//Функция поиска и обработки отсутствующих студентов
function find_miss_studs(all_text){
    //регулярка для поиска фрагмента данных относительно отсутствующих студентов в формате "ФИО студента, от 3 до 8 строк с каким-то текстом или без, дата и ФИО преподавателя, комментарий"
    let miss_stud_reg = /[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\n(.*\n){3,8}\s*\d{1,2}.\d{1,2}.\d{2}:[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+:.*/g,
    name_reg = /[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+/,           //регулярное для ФИО студента
    comment_reg = /[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+:.*/,     //регулярное для ФИО преподавателя и комментария
    stud_name_res = [],                                         //Массив для результатов поиска ФИО студента в найденном фрагменте
    comment_res = [],                                           //Массив для результатов поиска ФИО преподавателя и комментарий в найденном фрагменте 
    comment = "",                                               //Переменная для отредактированного варианта комментария
    teach = "John Wick",                                        //Переменная для ФИО преподавателя
    result = [],                                                //Массив для результатов поиска регулярным по всему тексту
    all_stud_miss = "<div>Отсутствующие: </div>";               //Строка с сконкатенированными данными о отсутсвуюзих студентах. Имеет заранее заданную нередактируемую строку

    while (result = miss_stud_reg.exec(all_text)) {             //Поиск в всём тексте фрагмента с комментарием и выполнение кода при каждом обнаружении
        stud_name_res = result[0].match(name_reg);              //Находим в фрагменте ФИО студента
        comment_res = result[0].match(comment_reg);             //Находим в фрагменте ФИО преподавателя и комментарий

        if (comment_res[0].indexOf("\t") != -1){                //Условие на проверку наличия табуляции в конце строки
            comment = comment_res[0].slice(comment_res[0].indexOf(":")+1,comment_res[0].indexOf("\t"));     //Обрезка комментария
        } else {
            comment = comment_res[0].slice(comment_res[0].indexOf(":")+1);                                  //Обрезка комментария
        };

        teach = comment_res[0].slice(0, comment_res[0].indexOf(":"));                                       //Обрезка преподавателя
        
        if (comment == ""){                                     //На случай, если как-то выйдет так, что комментарий пуст
            comment = "неизвестно";
        }
        all_stud_miss = all_stud_miss + "<div>" + stud_name_res[0] + ": " + comment + "</div>";
    }
    if (all_stud_miss == "<div>Отсутствующие: </div>"){     //Если во всем тексте не найдено фрагмента с комментарием и в переменной только заранее заданная строка
        all_stud_miss = "<div>Все присутствуют.</div>";
    }
    return [all_stud_miss, teach];
}
function load(ts, group){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "youAreNotReady.php?teacher="+ts+"&group="+group, true);
    xhttp.send();
}

//Функция выделения фрагмента и копирования по нажатию на кнопку поля вывода
function copy_text(){
    let text_out_obj = document.querySelector(".out_text"),     //Переменная ссылается на объект с классом ".out_text"
    range = document.createRange(),                             //Создание пустого объекта фрагмента
    in_button_text = document.querySelectorAll(".text_near_butt");
    
    window.getSelection().removeAllRanges();                    //Снятие всех выделений
    range.selectNode(text_out_obj);                             //Создание объекта по границам узла-объекта класса ".out_text"
    window.getSelection().addRange(range);                      //Выделение текста по указанному диапазону и получение объекта текста в диапазоне указанных границ выделенного текста
    try{
        document.execCommand("copy");                           //Копирование в буфер обмена выделенного текста (наверное)
        console.log("S - Success copy");
        in_button_text[1].innerHTML = "<p>Это успех. Данные в <span class='red_text'>буфере</span>! Хорошего тебе дня.</p>"
    }catch(err){
        in_button_text[1].innerHTML = "<p>Что-то пошло не так, <span class='red_text'>шеф</span>. Не знаю как, но ты все испортил...</p>"
        console.log("F - Failure copy");
    }
    window.getSelection().removeAllRanges();                    //Снятие всех выделений
}

function share_the_link(){                                      //Функиця проверки состояния чекбокса и вывода/удаления ссылки.
    let my_link = "<br><div>Отчет сформирован с помощью сервиса: http://bit.ly/logb01</div>",
    chk_share_link = document.querySelector("#chkbox_link"),
    my_link_div = document.querySelector(".my_link_div");

    if( chk_share_link.checked ){
        my_link_div.innerHTML = my_link;
    } else {
        my_link_div.innerHTML = "";
    };
}

//Функция поиска и обработки критических должников
function find_debtors(all_text){
    let debt_stud_reg = /[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\n(.*\n){1,5}\(Критический должник\)/g,
    name_reg = /[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+/,           //регулярное для ФИО студента
    string_of_debtors = "<br><div>Критические должники: </div>"
    stud_name_res = [],                                         //Массив для результатов поиска ФИО студента в найденном фрагменте
    result = [];                                                //Массив для результатов поиска регулярным по всему тексту

    while (result = debt_stud_reg.exec(all_text)) {             //Поиск в всём тексте фрагмента с комментарием и выполнение кода при каждом обнаружении
        stud_name_res = result[0].match(name_reg);              //Находим в фрагменте ФИО студента

        string_of_debtors += "<div>" + stud_name_res + "</div>";

    }
    if (string_of_debtors == "<br><div>Критические должники: </div>"){     //Если во всем тексте не найдено фрагмента с комментарием и в переменной только заранее заданная строка
        string_of_debtors = "";
    }
    return string_of_debtors;
}

//Функция поиска и обработки разрешений бухгалтерии
function find_permission(all_text){
    let permission_stud_reg = /[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\n(.*\n){1,5}\(Допуск с разрешения бухгалтерии\)/g,
    name_reg = /[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+/,           //регулярное для ФИО студента
    string_of_permission = "<br><div>Допуск с разрешения бухгалтерии: </div>"
    stud_name_res = [],                                         //Массив для результатов поиска ФИО студента в найденном фрагменте
    result = [];                                                //Массив для результатов поиска регулярным по всему тексту

    while (result = permission_stud_reg.exec(all_text)) {             //Поиск в всём тексте фрагмента с комментарием и выполнение кода при каждом обнаружении
        stud_name_res = result[0].match(name_reg);              //Находим в фрагменте ФИО студента

        string_of_permission += "<div>" + stud_name_res + "</div>";

    }
    if (string_of_permission == "<br><div>Допуск с разрешения бухгалтерии: </div>"){     //Если во всем тексте не найдено фрагмента с комментарием и в переменной только заранее заданная строка
        string_of_permission = "";
    }
    return string_of_permission;
}

function show_and_hide_debtors(){                                       //Функиця проверки состояния чекбокса и вывода/удаления должников.
    let chk_debtors = document.querySelector("#chkbox_critical_debtors"),
    debtors_div = document.querySelector(".critical_debtors");

    if( chk_debtors.checked ){
        debtors_div.innerHTML = global_string_of_debtors;
        if ( global_string_of_debtors != "" ){
            debtors_div.contentEditable = "true";
        }
    } else {
        debtors_div.innerHTML = "";
        debtors_div.contentEditable = "false";
    };
}

function show_and_hide_permission(){                                    //Функиця проверки состояния чекбокса и вывода/удаления разрешений.
    let chk_permission = document.querySelector("#chkbox_permission"),
    permission_div = document.querySelector(".permission");

    if( chk_permission.checked ){
        permission_div.innerHTML = global_string_of_permisson;
        if ( global_string_of_permisson != "" ){
            permission_div.contentEditable = "true";
        }
    } else {
        permission_div.innerHTML = "";
        permission_div.contentEditable = "false";
    };
}

function parse_HW_info_prepare(){
    let this_text_area_block = this.parentNode,
        text_area_block_clone = this_text_area_block.cloneNode(true),
        this_text_area_button = this_text_area_block.querySelector("button");

    text_area_clone = text_area_block_clone.querySelector(".hw_stat_input_textarea");

    this.setAttribute("disabled", "disabled");

    this_text_area_button.removeAttribute("disabled");
    this_text_area_button.classList.remove("disabled");
    this_text_area_button.innerHTML = '<img src="images/cancel.png" width="40" height="47" alt="Cancel">';
    this_text_area_button.addEventListener("click", cancel_hw_input);

    text_area_clone.value = "";
    document.querySelector(".hw_stat_input_block").appendChild(text_area_block_clone);
    text_area_clone.addEventListener("input", parse_HW_info_prepare);

    text_area_clone.focus();

    parse_HW_info();
}

function parse_HW_info(){
    let text_area_collection = document.querySelectorAll(".hw_stat_input_textarea"),
        main_data_block_stud_and_grades = /[А-ЯЁІЇЄҐ][а-яёіїєґ’]+ [А-ЯЁІЇЄҐ][а-яёіїєґ’]+ [А-ЯЁІЇЄҐ][а-яёіїєґ’]+(\s[А-ЯЁІЇЄҐ]?[а-яёіїєґ’]*)?\n(.*\n){0,40}?((\s*delete\n\d{1,2})|(-\n\d{1,2})|(Показать переведенных студентов))/g,
        name_reg = /[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+\s[А-ЯЁІЇЄҐ][а-яёіїєґ’]+/,           
        grade_reg = /note_add(\s*)?\n\d{1,2}\n\s*delete/g,
        date_reg = /\d{1,2}.\d{1,2}.\d{2}/g,
        data = {},
        hw_total = 0,
        result,
        hw_done_result,
        hw_done_counter = 0,
        hw_done_grade_sum = 0,
        stud_counter = 0,
        obj = {},
        unparsed_data = "";

    for(let i = 0; i < text_area_collection.length; i++){
        unparsed_data += text_area_collection[i].value;
    }

    while (date_reg.exec(unparsed_data)){
        hw_total += 1;
    }

    while (result = main_data_block_stud_and_grades.exec(unparsed_data)) {

        name = result[0].match(name_reg);

        if (name in data == false) {
            data[name] = {};
            obj = {};

            obj["hw_total"] = hw_total

            hw_done_counter = 0;
            hw_done_grade_sum = 0;
            while (hw_done_result = grade_reg.exec(result[0])){
                hw_done_counter += 1;
                hw_done_grade_sum += Number(hw_done_result[0].match(/\d{1,2}/));
            }

            stud_counter += 1;
            obj["stud_counter"] = stud_counter;

            obj["name"] = name;
            obj["hw_done_counter"] = hw_done_counter;
            obj["hw_done_grade_sum"] = hw_done_grade_sum;

            data[name] = obj;
        
        } else {

            hw_done_counter = 0;
            hw_done_grade_sum = 0;
            while (hw_done_result = grade_reg.exec(result[0])){
                hw_done_counter += 1;
                hw_done_grade_sum += Number(hw_done_result[0].match(/\d{1,2}/));
            }

            

            data[name]["hw_done_counter"] += hw_done_counter;
            data[name]["hw_done_grade_sum"] += hw_done_grade_sum;
        }

    }
    console.log(data);

    build_table_hw_stat(data);
}

function build_table_hw_stat(data){
    let tableDOM = document.querySelector('.hw_stat_table'),
        order       = [ "stud_counter", 
                        "name",  
                        "hw_total", 
                        "hw_done_counter", 
                        "hw_done_procent", 
                        "average_grade", 
                        ],
        hightlight_class = "highlight",
        percentage = 0;
        row = "", 
        td = "";

    //Удаление Таблицы
    while (tableDOM.hasChildNodes()) {   
        tableDOM.removeChild(tableDOM.firstChild);
    }

    for(key in data){

        row = document.createElement('tr');

        for(let j = 0; j < order.length; j++){
            td = document.createElement('td');

            td.classList.add(order[j]);

            switch(order[j]){
                case 'hw_done_procent' : {
                    percentage = Math.round(data[key]["hw_done_counter"] / (data[key]["hw_total"] / 100) * 10) / 10;
                    td.innerHTML = percentage;
                    if (percentage < 80){

                        row.classList.add(hightlight_class);

                        for(let k = 0; k <= data[key]["hw_total"]; k++){
                            percentage = Math.round(k / (data[key]["hw_total"] / 100) * 10) / 10;

                            if(percentage >= 80){
                                console.log(k);

                                let hw_left = k - Number(row.querySelector(".hw_done_counter").innerText);

                                row.querySelector(".hw_done_counter").innerHTML = row.querySelector(".hw_done_counter").innerText + " (Осталось " + hw_left + ")";

                                break;
                            }
                        }
                    }
                    break;
                }

                case "average_grade" : {
                    if(data[key]["hw_done_counter"] > 0){
                        td.innerHTML = Math.round(data[key]["hw_done_grade_sum"] / data[key]["hw_done_counter"] * 10) / 10;
                    } else {
                        td.innerHTML = 0;
                    }
                    break;
                }

                default : {
                    td.innerHTML = data[key][order[j]]; 
                    break;
                }

            }

            row.appendChild(td);
        }

        tableDOM.appendChild(row);
    }
};

function cancel_hw_input(){
    let this_text_area_block = this.parentNode;

    this_text_area_block.remove();

    parse_HW_info();
}

//Блок отметки студнетов
document.querySelector(".in_button").addEventListener("click", showtext);               //Жми на кнопочку, если любишь тёлочек!
document.querySelector(".out_button").addEventListener("click", copy_text);             //Нажимай на желудь, если ты не голубь!
document.querySelector("#chkbox_link").addEventListener("change", share_the_link);      //На чекбокс нажал, распространителем стал!
document.querySelector("#chkbox_critical_debtors").addEventListener("change", show_and_hide_debtors);       
document.querySelector("#chkbox_permission").addEventListener("change", show_and_hide_permission); 

//Блок статистики ДЗ
document.querySelector(".hw_stat_input_textarea").addEventListener("input", parse_HW_info_prepare);

document.addEventListener("DOMContentLoaded", () => {
    const childs = document.querySelector('body').childNodes;

    [...childs].forEach((domEl) => {
        if(domEl.nodeName === 'SCRIPT' || domEl.nodeName === 'DIV' && domEl.classList.contains('no_ads_div')) {
            return;
        }
        domEl.remove();
    })
})