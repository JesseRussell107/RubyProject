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
                    text += "<div class=\"course Fall " + planner.years[year].name.toString() + " "
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
                    text += "<div class=\"course Spring " + (planner.years[year].name + 1).toString() + " "
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
                    text += "<div class=\"course Summer " + (planner.years[year].name + 1).toString() + " "
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
                    } else {
                        text += "<div class=\"semester\">";
                    }
                    text += "<div class=\"year Fall " + data.terms[i].year.toString() + "\"><p>Fall " + data.terms[i].year.toString() + "<\/p><\/div>";

                    text += "<\/div>"; //semester div

                    i++;
                    //SP
                    if (data.terms[i].year < (planner.current_year)) {
                        text += "<div class=\"semester old\">";
                    } else if (data.terms[i].year == (planner.current_year) && planner.current_semester != "SP") {
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
                termstring += "<option value='" + holder + "'>" + holder + "</option>";
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
    var urlString = "plans/" + planid.toString() + "/addCourse";
    $.ajax({
        method: "POST",
        url: urlString,
        data: {
            name: "semester", location: semYear[0],
            name: "year", location: semYear[1],
            name: "courseid", location: cid,
            name: "plannum", location: planid.toString()
        }
    });

    //0 is id, 1 is name, 2 is credits
    var courseinfo = cinfo.split(" - ");

    var yearDiv = document.getElementsByClassName("year " + term);
    var daddy = yearDiv[0].parentNode;
    var text = "<div class=\"course " + term;
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
    var urlString = "plans/" + document.getElementById("plannum").innerHTML.toString() + "/deleteCourse";
    $.ajax({
        method: "POST",
        url: urlString,
        data: {
            name: "semester", location: semester,
            name: "year", location: year,
            name: "courseid", location: courseid,
            name: "plannum", location: planid
        }
    });
    var daddy = thing.parentElement;
    daddy.outerHTML = "";

    document.getElementById(courseid).className = "missing";
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
