import { X as current_component, S as pop, P as push, Y as ensure_array_like, Z as store_get, _ as unsubscribe_stores } from "../../chunks/index.js";
import { e as escape_html } from "../../chunks/escaping.js";
import "clsx";
import { w as writable } from "../../chunks/index2.js";
const replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (value == null || !value && is_boolean || value === "" && name === "class") return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
const whitespace = [..." 	\n\r\f \v\uFEFF"];
function to_class(value, hash, directives) {
  var classname = value == null ? "" : "" + value;
  {
    classname = classname ? classname + " " + hash : hash;
  }
  if (directives) {
    for (var key in directives) {
      if (directives[key]) {
        classname = classname ? classname + " " + key : key;
      } else if (classname.length) {
        var len = key.length;
        var a = 0;
        while ((a = classname.indexOf(key, a)) >= 0) {
          var b = a + len;
          if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
            classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
          } else {
            a = b;
          }
        }
      }
    }
  }
  return classname === "" ? null : classname;
}
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
const savedPage = typeof window !== "undefined" ? localStorage.getItem("currentPage") || "ScheduleSummaryPage" : "ScheduleSummaryPage";
const currentPage = writable(savedPage);
if (typeof window !== "undefined") {
  currentPage.subscribe((value) => {
    localStorage.setItem("currentPage", value);
    localStorage.setItem("scheduleIdCounter", "0");
    localStorage.setItem("currentScheduleId", "0");
  });
}
const getStoredCounter = () => {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem("scheduleIdCounter");
    return storedValue ? parseInt(storedValue, 10) : 0;
  }
  return 0;
};
const scheduleIdCounter = writable(getStoredCounter());
if (typeof window !== "undefined") {
  scheduleIdCounter.subscribe((value) => {
    localStorage.setItem("scheduleIdCounter", value.toString());
  });
}
const currentScheduleId = writable(null);
if (typeof window !== "undefined") {
  currentScheduleId.subscribe((value) => {
    if (value !== null) {
      localStorage.setItem("currentScheduleId", value.toString());
    }
  });
}
function WelcomePage($$payload, $$props) {
  push();
  let countdown = 10;
  $$payload.out += `<div class="welcome-container svelte-y23asq"><div class="page1-header svelte-y23asq"><h1 class="svelte-y23asq">MindAnchor</h1></div> <h1 class="welcome-title svelte-y23asq">Thank you for installing MindAnchor</h1> <img class="welcome-logo svelte-y23asq" src="/hello_palm.png" alt="MindAnchor Logo"> <p class="svelte-y23asq">You will be directed to the dashboard in ${escape_html(countdown)} seconds</p> <p class="svelte-y23asq">or you can experience MindAnchor now with the below button.</p> <button class="svelte-y23asq">Experience MindAnchor Now!</button></div>`;
  pop();
}
function Dashboard($$payload) {
  $$payload.out += `<div><h1>Dashboard</h1> <p>Welcome to the MindAnchor Dashboard!</p></div>`;
}
function SchedulePage($$payload, $$props) {
  push();
  let name;
  let startDate = "";
  let endDate = "";
  let startTime = "";
  let endTime = "";
  $$payload.out += `<div class="page1-container svelte-20s1w5"><div class="page1-header svelte-20s1w5"><img src="/icon.png" alt="MindAnchor Logo" width="25px" height="2px" class="svelte-20s1w5"> <h1 class="svelte-20s1w5">MindAnchor</h1></div> <hr class="svelte-20s1w5"> <div class="page1-duration svelte-20s1w5"><label for="page1-duration" style="font-weight: bold;" class="svelte-20s1w5">Enter the duration of the activity:</label> <div id="page1-duration" class="page1-inputs svelte-20s1w5"><input type="date"${attr("value", startDate)} placeholder="Start Date" name="Startdate" class="svelte-20s1w5"> <input type="date"${attr("value", endDate)} placeholder="End Date" name="EndDate" class="svelte-20s1w5"> <input type="time"${attr("value", startTime)} placeholder="Start Time" name="StartTime" class="svelte-20s1w5"> <input type="time"${attr("value", endTime)} placeholder="End Time" name="EndTime" class="svelte-20s1w5"></div> <div style="display: flex;"><label for="Startdate" style="padding-right: 125px;font-weight:bold;" class="svelte-20s1w5">Start Date</label> <label for="Startdate" style="padding-right: 145px;font-weight:bold;" class="svelte-20s1w5">End Date</label> <label for="Startdate" style="padding-right: 130px;font-weight:bold;" class="svelte-20s1w5">Start Time</label> <label for="Startdate" style="font-weight:bold;" class="svelte-20s1w5">End Time</label></div></div> <div class="page1-tasks svelte-20s1w5"><label for="page1-tasks" style="font-weight: bold;" class="svelte-20s1w5">Name this activity:</label> <div id="page1-tasks" class="page1-task-input svelte-20s1w5"><input type="text" style="border-radius: 20px;"${attr("value", name)} placeholder="Enter a name for the schedule, or else it will be stored as untitled" class="svelte-20s1w5"></div></div> <div class="page1-actions svelte-20s1w5"><button class="page1-confirm svelte-20s1w5">Confirm Activity Duration &amp; To-Do List</button> <button class="page1-discard svelte-20s1w5">Discard This Schedule</button></div></div>`;
  pop();
}
function BlackList_WhiteListPage($$payload, $$props) {
  push();
  let blacklistCategories = [
    {
      name: "Education",
      selected: false,
      disabled: false
    },
    {
      name: "Technology",
      selected: false,
      disabled: false
    },
    {
      name: "News",
      selected: false,
      disabled: false
    },
    {
      name: "Sports",
      selected: false,
      disabled: false
    },
    {
      name: "Entertainment",
      selected: false,
      disabled: false
    },
    {
      name: "Gaming",
      selected: false,
      disabled: false
    },
    {
      name: "Social Media",
      selected: false,
      disabled: false
    },
    {
      name: "Shopping",
      selected: false,
      disabled: false
    },
    {
      name: "Travel/Tourism",
      selected: false,
      disabled: false
    }
  ];
  let blacklistUrl = "";
  let blacklistUrls = [];
  let filteredBlacklistSuggestions = [];
  $$payload.out += `<div class="page2-container svelte-tzo65l"><div class="page2-header svelte-tzo65l"><img src="/icon.png" alt="MindAnchor Logo" width="25px" height="1px" class="svelte-tzo65l"> <h1 class="svelte-tzo65l">MindAnchor</h1> <button class="page2-help svelte-tzo65l">?</button></div> <hr class="svelte-tzo65l"> <div class="page2-tabs svelte-tzo65l"><button${attr("class", to_class("page2-tab page2-active", "svelte-tzo65l"))}>Blacklist</button> <button${attr("class", to_class("page2-tab ", "svelte-tzo65l"))}>Whitelist</button></div> <div class="page2-content"><label for="page2-categories" class="page2-section-title svelte-tzo65l">Content Categories</label> <div id="page2-categories" class="page2-categories svelte-tzo65l">`;
  {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(blacklistCategories);
    $$payload.out += `<!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let { name, selected, disabled } = each_array[index];
      $$payload.out += `<button${attr("disabled", disabled, true)}${attr("class", to_class("", "svelte-tzo65l", { "selected": selected, "disabled": disabled }))}>${escape_html(name)} ${escape_html(selected ? "✖" : "+")}</button>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div> <label for="page2-urls" class="page2-section-title svelte-tzo65l">Website URLs</label> <div id="page2-urls" class="page2-urls svelte-tzo65l">`;
  {
    $$payload.out += "<!--[-->";
    const each_array_2 = ensure_array_like(filteredBlacklistSuggestions);
    const each_array_3 = ensure_array_like(blacklistUrls);
    $$payload.out += `<div class="page2-url-input svelte-tzo65l"><input type="text"${attr("value", blacklistUrl)} placeholder="Add blacklist URL" list="blacklist-suggestions" class="svelte-tzo65l"> <button class="svelte-tzo65l">+</button> <datalist id="blacklist-suggestions"><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let suggestion = each_array_2[$$index_2];
      $$payload.out += `<option${attr("value", suggestion)}></option>`;
    }
    $$payload.out += `<!--]--></datalist></div> <div class="page2-url-list svelte-tzo65l"><ul class="svelte-tzo65l"><!--[-->`;
    for (let index = 0, $$length = each_array_3.length; index < $$length; index++) {
      let url = each_array_3[index];
      $$payload.out += `<li class="svelte-tzo65l">${escape_html(url)} <button class="svelte-tzo65l">✖</button></li>`;
    }
    $$payload.out += `<!--]--></ul></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="page2-actions svelte-tzo65l"><button class="page2-confirm svelte-tzo65l">Confirm Blacklist &amp; Whitelist</button> <button class="page2-discard svelte-tzo65l">Discard This Schedule</button></div></div></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function ScheduleSummaryPage($$payload, $$props) {
  push();
  let schedules = [];
  $$payload.out += `<div class="container svelte-bw3odq"><div class="page1-header svelte-bw3odq"><img src="/icon.png" alt="MindAnchor Logo" width="25px" height="2px" class="svelte-bw3odq"> <h1 class="svelte-bw3odq">MindAnchor</h1></div> <hr> <nav class="nav-container svelte-bw3odq"><div class="nav-item-active svelte-bw3odq"><span class="icon svelte-bw3odq">📅</span> Schedules</div> <div class="nav-item svelte-bw3odq"><span class="icon svelte-bw3odq">📊</span> User Progress</div> <div class="nav-item svelte-bw3odq"><span class="icon svelte-bw3odq">$</span> Subscription</div> <div class="nav-item svelte-bw3odq"><span class="icon svelte-bw3odq">⚙️</span> Settings</div></nav> <h2 style="text-align: center; margin-top:10px;margin-bottom:10px;">Upcoming Activities</h2> `;
  if (schedules.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="empty-state-container svelte-bw3odq"><div class="empty-state svelte-bw3odq"><img src="/no_schedule.svg" alt="No Schedule" class="svelte-bw3odq"> <p>If you have scheduled any activities, they will appear here.</p> <p>You currently have no activities scheduled!</p> <p>Schedule an activity now with the button below :)</p></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(schedules);
    $$payload.out += `<div class="activity-box svelte-bw3odq"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let schedule = each_array[$$index];
      $$payload.out += `<div class="activity-card svelte-bw3odq"><div style="cursor: pointer;"><p><strong>Activity Name:</strong> ${escape_html(schedule.name)}</p> <p><strong>Start:</strong> ${escape_html(schedule.startDate)} ${escape_html(schedule.startTime)}</p> <p><strong>End:</strong> ${escape_html(schedule.endDate)} ${escape_html(schedule.endTime)}</p></div> <button class="delete-btn svelte-bw3odq">🗑</button></div> <hr>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--> <button class="schedule-btn svelte-bw3odq">Schedule New Activity</button></div>`;
  pop();
}
function T_and_C_Page($$payload, $$props) {
  push();
  let agreed = false;
  $$payload.out += `<div class="container svelte-1e74t2w"><div class="header svelte-1e74t2w"><img src="/icon.png" alt="MindAnchor Logo" class="svelte-1e74t2w"> <h2>MindAnchor</h2></div> <h3>TERMS AND CONDITIONS</h3> <div class="terms-box svelte-1e74t2w"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
        Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis
        sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.</p> <p>Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent
        per conubia nostra, per inceptos himenaeos.</p></div> <div class="checkbox-container svelte-1e74t2w"><input id="agree" type="checkbox"${attr("checked", agreed, true)} class="svelte-1e74t2w"> <label for="agree">I agree to all terms and conditions</label></div> <button class="continue-btn svelte-1e74t2w"${attr("disabled", true, true)}>Continue</button></div>`;
  pop();
}
function Active_State_Page($$payload, $$props) {
  push();
  let countdown = 30;
  let schedule = null;
  let isBionicEnabled = false;
  onDestroy(() => {
  });
  $$payload.out += `<div class="container svelte-1rhkqnl"><div class="page1-header svelte-1rhkqnl"><img src="/icon.png" alt="MindAnchor Logo" width="25px" height="2px" class="svelte-1rhkqnl"> <h1 class="svelte-1rhkqnl">MindAnchor</h1></div> <hr class="svelte-1rhkqnl"> <div class="description svelte-1rhkqnl"><p><strong class="svelte-1rhkqnl">Schedule Name:</strong> ${escape_html(schedule?.name)}</p> <p><strong class="svelte-1rhkqnl">Start Time Date:</strong> ${escape_html(schedule?.startDate + " : " + schedule?.startTime)} | <strong class="svelte-1rhkqnl">End Time Date:</strong> ${escape_html(schedule?.endDate + " : " + schedule?.endTime)}</p></div> <hr style="margin-top: 10px;" class="svelte-1rhkqnl"> <div class="buttons svelte-1rhkqnl"><button id="bionifyButton" class="btn btn-primary svelte-1rhkqnl"${attr("disabled", isBionicEnabled, true)}>Bionify webpage text</button> <button id="unbionifyButton" class="btn btn-secondary svelte-1rhkqnl"${attr("disabled", true, true)}>Unbionify webpage text</button></div> <div class="buttons svelte-1rhkqnl"><button class="btn btn-primary svelte-1rhkqnl">Activate motivational cues</button> <button class="btn btn-secondary svelte-1rhkqnl">Deactivate motivational cues</button></div> <h2 class="svelte-1rhkqnl">How have you been doing so far?</h2> <canvas id="chart"></canvas> <div class="actions svelte-1rhkqnl"><button class="btn stop-btn svelte-1rhkqnl">Stop current activity</button> <p class="countdown svelte-1rhkqnl">The dashboard will close in <strong class="svelte-1rhkqnl">${escape_html(countdown)}</strong> seconds!</p></div></div>`;
  pop();
}
function Progress_Chart($$payload) {
  $$payload.out += `<div></div>`;
}
function _page($$payload) {
  var $$store_subs;
  if (store_get($$store_subs ??= {}, "$currentPage", currentPage) === "WelcomePage") {
    $$payload.out += "<!--[-->";
    WelcomePage($$payload);
  } else {
    $$payload.out += "<!--[!-->";
    if (store_get($$store_subs ??= {}, "$currentPage", currentPage) === "Dashboard") {
      $$payload.out += "<!--[-->";
      Dashboard($$payload);
    } else {
      $$payload.out += "<!--[!-->";
      if (store_get($$store_subs ??= {}, "$currentPage", currentPage) === "SchedulePage") {
        $$payload.out += "<!--[-->";
        SchedulePage($$payload);
      } else {
        $$payload.out += "<!--[!-->";
        if (store_get($$store_subs ??= {}, "$currentPage", currentPage) === "BlackList_WhiteListPage") {
          $$payload.out += "<!--[-->";
          BlackList_WhiteListPage($$payload);
        } else {
          $$payload.out += "<!--[!-->";
          if (store_get($$store_subs ??= {}, "$currentPage", currentPage) === "ScheduleSummaryPage") {
            $$payload.out += "<!--[-->";
            ScheduleSummaryPage($$payload);
          } else {
            $$payload.out += "<!--[!-->";
            if (store_get($$store_subs ??= {}, "$currentPage", currentPage) === "T_and_C_Page") {
              $$payload.out += "<!--[-->";
              T_and_C_Page($$payload);
            } else {
              $$payload.out += "<!--[!-->";
              if (store_get($$store_subs ??= {}, "$currentPage", currentPage) === "ProgressChart") {
                $$payload.out += "<!--[-->";
                Progress_Chart($$payload);
              } else {
                $$payload.out += "<!--[!-->";
                if (store_get($$store_subs ??= {}, "$currentPage", currentPage) === "Active_State_Page") {
                  $$payload.out += "<!--[-->";
                  Active_State_Page($$payload);
                } else {
                  $$payload.out += "<!--[!-->";
                }
                $$payload.out += `<!--]-->`;
              }
              $$payload.out += `<!--]-->`;
            }
            $$payload.out += `<!--]-->`;
          }
          $$payload.out += `<!--]-->`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
export {
  _page as default
};
