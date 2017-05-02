/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Course(name, ID, credits, semester, year) {
    this.name = name;
    this.ID = ID;
    this.credits = credits;
    this.year = year;
    this.semester = semester;
    this.history = false;
}

function Year(name) {
    this.name = name;
    this.fa = {};
    this.sp = {};
    this.su = {};
}

function Plan(plan_name, catalog_year, major, student_name, current_semester, current_year, courses) {
    this.plan_name = plan_name;
    this.catalog_year = catalog_year;
    this.major = major;
    this.student_name = student_name;
    this.current_semester = current_semester;
    this.current_year = current_year;
    this.courses = courses;
}

function initializeUR() {
    $.getJSON("1.json", function (edata) {
        var planid = document.getElementById("plannum").innerHTML;
        $.getJSON(planid, function (data) {
            var catYear;
            var courseList = [];

            //$("#plan-name").append(data.student);
            catYear = data.catalogYear;
            //$("#plan-term").append(catYear);
            //$("#plan-majors").append(data.major);
            //$("#plan-IDname").append(data.planName);
            var season;
            if (data.currTerm == "Spring") {
                season = "SP";
            } else if (data.currTerm == "Fall") {
                season = "FA";
            } else { //Summer
                season = "SU";
            }

            //Build courses
            $.each(data.terms, function (index, element) {
                var smester; //not a typo
                if (element.semester == "Spring") {
                    smester = "SP";
                } else if (element.semester == "Fall") {
                    smester = "FA";
                } else { //Summer
                    smester = "SU";
                }
                var yr = element.year;
                $.each(element.courses, function (index, element) {
                    var c = new Course(element.name, element.courseID, element.credits, smester, yr);
                    courseList.push(c);
                });

            });


            var planner = new Plan(data.planName, data.catalogYear, data.major, data.student, season, data.currYear, courseList);
            planner.years = [];
            for (i = 0; i < courseList.length; i++) {
                var c = courseList[i];
                if (c.semester === "FA" && !(c.year.toString() in planner.years)) {
                    planner.years[c.year.toString()] = new Year(c.year);
                } else if ((c.semester === "SP" || c.semester === "SU") &&
                    !(((c.year - 1).toString()) in planner.years)) {
                    planner.years[(c.year - 1).toString()] = new Year(c.year - 1);
                }

                var s = c.semester;
                var iden = c.ID;
                if (s === "FA") {
                    planner.years[c.year.toString()].fa[iden] = courseList[i];
                } else if (s === "SP") {
                    var yr = c.year - 1;
                    planner.years[yr.toString()].sp[iden] = courseList[i];
                } else //SU  
                {
                    var yr = c.year - 1;
                    planner.years[yr.toString()].su[iden] = courseList[i];
                }
            }
            var ur = document.getElementById("UR");
            var text = "";
            var empty_plan = true;
            for (var year in planner.years) {
                empty_plan = false;
                text += "<div class=\"row\">";

                //FA
                if (year < planner.current_year) {
                    text += "<div class=\"semester old\">";
                } else if (year == planner.current_year && planner.current_semester == "FA") {
                    text += "<div class=\"semester old\">";
                } else {
                    text += "<div class=\"semester\">";
                }
                text += "<div class=\"year Fall " + planner.years[year].name.toString() + "\"><p>Fall " + planner.years[year].name.toString() + "<\/p><\/div>";
                for (var cid in planner.years[year].fa) {
                    var holder = planner.years[year].fa[cid];
                    text += "<div class=\"course Fall " + planner.years[year].name.toString() + " ";
                    text += holder.ID + "\"><div class=\"delete\" onclick=\"javascript:onDelete('Fall', '";
                    text += (planner.years[year].name).toString() + "', '" + holder.ID + "', this);\">X</div><div class=\"name\">";
                    text += holder.ID + " - ";
                    text += holder.name;
                    text += "<\/div><div class=\"credits\">";
                    text += holder.credits.toString();
                    text += "<\/div><\/div>";
                }
                text += "<\/div>"; //semester div

                //SP
                if (year < (planner.current_year)) {
                    text += "<div class=\"semester old\">";
                } else if (year == (planner.current_year - 1) && planner.current_semester == "SP") {
                    text += "<div class=\"semester old\">";
                } else {
                    text += "<div class=\"semester\">";
                }
                text += "<div class=\"year Spring " + (planner.years[year].name + 1).toString() + "\"><p>Spring ";
                text += (planner.years[year].name + 1).toString() + "</p><\/div>";
                for (var cid in planner.years[year].sp) {
                    var holder = planner.years[year].sp[cid];
                    text += "<div class=\"course Spring " + (planner.years[year].name + 1).toString() + " ";
                    text += holder.ID + "\"><div class=\"delete\" onclick=\"javascript:onDelete('Spring', '";
                    text += (planner.years[year].name + 1).toString() + "', '" + holder.ID + "', this);\">X</div><div class=\"name\">";
                    text += holder.ID + " - ";
                    text += holder.name;
                    text += "<\/div><div class=\"credits\">";
                    text += holder.credits.toString();
                    text += "<\/div><\/div>";
                }
                text += "<\/div>"; //semester div

                //SU
                if (year < (planner.current_year - 1)) {
                    text += "<div class=\"semester old\">";
                } else if (year == (planner.current_year - 1) && (planner.current_semester == "SU" || planner.current_semester == "FA")) {
                    text += "<div class=\"semester old\">";
                } else {
                    text += "<div class=\"semester\">";
                }
                text += "<div class=\"year Summer " + (planner.years[year].name + 1).toString();
                text += "\"><p>Summer " + (planner.years[year].name + 1).toString() + "</p><\/div>";
                for (var cid in planner.years[year].su) {
                    var holder = planner.years[year].su[cid];
                    text += "<div class=\"course Summer " + (planner.years[year].name + 1).toString() + " ";
                    text += holder.ID + "\"><div class=\"delete\" onclick=\"javascript:onDelete('Summer', '";
                    text += (planner.years[year].name + 1).toString() + "', '" + holder.ID + "', this);\">X</div><div class=\"name\">";
                    text += holder.ID + " - ";
                    text += holder.name;
                    text += "<\/div><div class=\"credits\">";
                    text += holder.credits.toString();
                    text += "<\/div><\/div>";
                }
                text += "<\/div>"; //semester div
                text += "<\/div>"; //row div
            }

            if (empty_plan === true) {
                for (var i = 0; i < data.terms.length; i++) {
                    text += "<div class=\"row\">";

                    //FA
                    if (data.terms[i].year < planner.current_year) {
                        text += "<div class=\"semester old\">";
                    } else if (data.terms[i].year == planner.current_year && planner.current_semester == "FA") {
                        text += "<div class=\"semester old\">";
                    } else if (data.terms[i].year == planner.current_year && planner.current_semester != "FA") {
                        text += "<div class=\"semester\">";
                    } else {
                        text += "<div class=\"semester\">";
                    }
                    text += "<div class=\"year Fall " + data.terms[i].year.toString() + "\"><p>Fall " + data.terms[i].year.toString() + "<\/p><\/div>";

                    text += "<\/div>"; //semester div

                    i++;
                    //SP
                    if (data.terms[i].year < (planner.current_year)) {
                        text += "<div class=\"semester old\">";
                    } else if (data.terms[i].year == (planner.current_year)) {
                        text += "<div class=\"semester old\">";
                    } else {
                        text += "<div class=\"semester\">";
                    }
                    text += "<div class=\"year Spring " + data.terms[i].year.toString() + "\"><p>Spring ";
                    text += data.terms[i].year.toString() + "</p><\/div>";

                    text += "<\/div>"; //semester div
                    i++;

                    //SU
                    if (data.terms[i].year < (planner.current_year)) {
                        text += "<div class=\"semester old\">";
                    } else if (data.terms[i].year == (planner.current_year) && (planner.current_semester == "SU" || planner.current_semester == "FA")) {
                        text += "<div class=\"semester old\">";
                    } else {
                        text += "<div class=\"semester\">";
                    }
                    text += "<div class=\"year Summer " + data.terms[i].year.toString();
                    text += "\"><p>Summer " + data.terms[i].year.toString() + "</p><\/div>";

                    text += "<\/div>"; //semester div
                    text += "<\/div>"; //row div
                }
            }
            ur.innerHTML = text + ur.innerHTML;

            //Make the search table
            var table = document.getElementById("search-body");
            table.innerHTML = "";
            var output = "";


            $.each(data.courses, function (index, element) {
                output += "<tr>";
                output += "<td>" + element.name + "</td>";
                output += "<td>" + element.courseID + "</td>";
                output += "<td>" + element.credits + "</td>";
                output += "<td>" + element.description + "</td>";
                output += "</tr>";
            });
            table.innerHTML = output;
            initializeTable();

            //Make the Accordion
            var gened = document.getElementById("gened");
            var major = document.getElementById("major");
            var track = document.getElementById("track");
            gened.innerHTML = "";
            major.innerHTML = "";
            track.innerHTML = "";
            var goutput = "";
            var moutput = "";
            var toutput = "";
            var incompletePlan = false;
            $.each(data.courses, function (index, element) {
                if (element.type == "Track") {
                    toutput += "<div id=\"" + element.courseID;
                    if (!checkIfInPlan(element.courseID, courseList)) {
                        toutput += "\" class=\"missing";
                        incompletePlan = true;
                    }
                    toutput += "\">";
                    toutput += element.name + " - " + element.courseID;
                    toutput += "</div>";
                } else if (element.type == "Major") {
                    moutput += "<div id=\"" + element.courseID;
                    if (!checkIfInPlan(element.courseID, courseList)) {
                        moutput += "\" class=\"missing";
                        incompletePlan = true;
                    }
                    moutput += "\">";
                    moutput += element.name + " - " + element.courseID;
                    moutput += "</div>";
                } else {
                    goutput += "<div id=\"" + element.courseID;
                    if (!checkIfInPlan(element.courseID, courseList)) {
                        goutput += "\" class=\"missing";
                        incompletePlan = true;
                    }
                    goutput += "\">";
                    goutput += element.name + " - " + element.courseID;
                    goutput += "</div>";
                }
            });
            if (incompletePlan) {
                //Do stuff to BL div
                //For now, all it does is give an option for CSS.
                var BL = document.getElementById("BL");
                BL.className = "Bad";
            }

            gened.innerHTML = goutput;
            track.innerHTML = toutput;
            major.innerHTML = moutput;

            //Populate BL
            var courseSelect = document.getElementById("courseSelect");
            var termSelect = document.getElementById("termSelect");
            termSelect.innerHTML = "";
            courseSelect.innerHTML = "";
            var termstring;
            $.each(data.terms, function (index, element) {
                var holder = element.semester + " " + element.year.toString();
                termstring += "<option class='" + holder + "' value='" + holder + "'>" + holder + "</option>";
            });
            var coursestring;
            $.each(data.courses, function (index, element) {
                var holder = element.courseID + " - " + element.name + " - " + element.credits.toString();
                coursestring += "<option value='" + element.courseID + "'>" + holder + "</option>";
            });
            termSelect.innerHTML = termstring;
            courseSelect.innerHTML = coursestring;
        });
    });
};

function onAddClick() {
    //get course from form
    var cid = $("#courseSelect").val();
    var cinfo = $("#courseSelect :selected").text();
    //get term from form
    var term = $("#termSelect").val();

    //make an array. semYear[0] is semester, semYear[1] is year
    var semYear = term.split(" ");
    var planid = document.getElementById("plannum").innerHTML;
    var urlString = planid.toString() + "/addCourse";
    $.ajax({
        method: "POST",
        url: urlString,
        dataType: "json",
        data: {
            semester: semYear[0],
            year: semYear[1],
            courseid: cid
        },
        success: function () {
            $("#result").text("Add Successful");
            setTimeout(function(){$("#result").text("");}, 2000);
        },
        error: function () {
            $("#result").text("Error: Add Unsuccessful - Contact the Admin")
            setTimeout(function(){$("#result").text("");}, 2000);
        }
    });

    //0 is id, 1 is name, 2 is credits
    var courseinfo = cinfo.split(" - ");

    var yearDiv = document.getElementsByClassName("year " + term);
    var daddy = yearDiv[0].parentNode;
    var text = "<div class=\"course " + term + " ";
    text += courseinfo[0] + "\"><div class=\"delete\" onclick=\"javascript:onDelete('" + semYear[0] + "', '";
    text += semYear[1] + "', '" + cid + "', this);\">X</div><div class=\"name\">";
    text += courseinfo[0] + " - ";
    text += courseinfo[1];
    text += "<\/div><div class=\"credits\">";
    text += courseinfo[2];
    text += "<\/div><\/div>";
    daddy.innerHTML += text;

    document.getElementById(courseinfo[0]).className = "";
}

function onDelete(semester, year, courseid, thing) {
    var planid = document.getElementById("plannum").innerHTML.toString();
    var urlString = document.getElementById("plannum").innerHTML.toString() + "/deleteCourse";
    $.ajax({
        method: "POST",
        url: urlString,
        data: {
            semester: semester,
            year: year,
            courseid: courseid
        },
        success: function () {
            $("#result").text("Delete Successful");
            setTimeout(function(){$("#result").text("");}, 2000);
        },
        error: function () {
            $("#result").text("Error: Delete Unsuccessful - Contact the Admin")
            setTimeout(function(){$("#result").text("");}, 2000);
        }
    });
    var daddy = thing.parentElement;
    daddy.outerHTML = "";
    if ($(".course."+courseid).length == 0) {
        document.getElementById(courseid).className = "missing";
    }
};

function checkIfInPlan(id, courseList) {
    for (i = 0; i < courseList.length; i++) {
        var c = courseList[i];
        if (c.ID == id) {
            return true;
        }
    }
    return false;
}

$(document).on("click", "#add", function () {
    var urlString = document.getElementById("plannum").innerHTML.toString() + "/addTerm";
    var year = $(".year").last();
    var yearClasses = year.attr("class").split(/\s+/);
    var yr = yearClasses[2];
    var text = "";
    text += "<div class=\"row\">";
    var currYear = $("#currentYear").text();
    var currSem = $("#currentSemester").text().replace(/\s+/g, '');
    //FA
    if (yr < currYear) {
        text += "<div class=\"semester old\">";
    } else if (yr == currYear && currSem != "FA") {
        text += "<div class=\"semester\">";
    } else if (yr == currYear && currSem == "FA") {
        text += "<div class=\"semester old\">";
    } else {
        text += "<div class=\"semester\">";
    }
    text += "<div class=\"year Fall " + yr + "\"><p>Fall " + yr + "<\/p><\/div>";
    text += "<\/div>"; //semester div

    yr++;
    //SP
    if (yr < currYear) {
        text += "<div class=\"semester old\">";
    } else if (yr == currYear) {
        text += "<div class=\"semester old\">";
    } else {
        text += "<div class=\"semester\">";
    }
    text += "<div class=\"year Spring " + (parseInt(yr) + 1) + "\"><p>Spring ";
    text += yr + "</p><\/div>";

    text += "<\/div>"; //semester div



    //SU
    if (yr < currYear) {
        text += "<div class=\"semester old\">";
    } else if (yr == currYear && (currSem == "SU" || currSem == "FA")) {
        text += "<div class=\"semester old\">";
    } else {
        text += "<div class=\"semester\">";
    }
    text += "<div class=\"year Summer " + yr;
    text += "\"><p>Summer " + yr + "</p><\/div>";

    text += "<\/div>"; //semester div
    text += "<\/div>"; //row div
    $.ajax({
        method: "POST",
        url: urlString,
        data: {
            year: yr
        }
    });
    $("#UR > .row").last().after(text);

    var termSelect = document.getElementById("termSelect");
    var option = "<option class='Fall " + (yr - 1) + "' value=\'Fall " + (yr - 1) + "'>Fall " + (yr - 1) + "</option>";
    option += "<option class='Spring " + yr + "' value=\'Spring " + yr + "'>Spring " + yr + "</option>";
    option += "<option class='Summer " + yr + "' value=\'Summer " + yr + "'>Summer " + yr + "</option>";
    termSelect.innerHTML += option;

});

$(document).on("click", "#remove", function () {
    var urlString = document.getElementById("plannum").innerHTML.toString() + "/deleteTerm";
    var $row = $("#UR > .row").last();
    //rows
    var empty = true;
    //terms
    $.each($row[0].children, function (element) {
        if (this.children.length != 1) {
            empty = false;
        }
    });
    if (empty) {
        var yr = $($row[0].children[0].children[0]).attr("class").split(" ");
        var year = parseInt(yr[2]);
        $.ajax({
            method: "POST",
            url: urlString,
            data: {
                year: year + 1
            }
        });
        $row[0].remove();
        var test = $("option.Fall." + yr[2]);
        test.remove();
        var test2 =  $("option.Spring." + (year+1).toString());
        test2.remove();
        $("option.Summer." + (year+1).toString()).remove();
       
    }
});
