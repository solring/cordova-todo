/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

// ========= below is main ==========
const LS_KEY_COUNTER = "todo_counter"
const LS_KEY_TODOLIST = "todo_list"

const store = window.localStorage
let counter = parseInt(store.getItem(LS_KEY_COUNTER),10) || 0
let json = store.getItem(LS_KEY_TODOLIST)
let todos = json ? JSON.parse(json) : {}

function save() {
    console.log("save:")
    store.setItem(LS_KEY_TODOLIST, JSON.stringify(todos))
}

// Handlers
function handleChecked(e) {
    let checked = e.target.checked
    let item = $(e.target.parentElement)
    if(!item) {
        console.warn("handleChecked: item not found.");
        return
    }
    checked ? item.addClass('completed') : item.removeClass('completed')
    item.find('input[type="text"]').attr('disabled', checked)
}

function handleBlur(e) {
    let text = e.target.value
    let item = e.target.parentElement
    if(!item) {
        console.warn("handleBlur: todo item not found.")
    }

    let key = $(item).attr('key')
    todos[key] = text
    save()
}

function remove(key) {
    $('#todo-list').find(`li[key="${key}"]`).remove()
    delete todos[key]
    save()
}

function newNode(key=null, value="" ) {
    console.log("newNode:");
    if(!key)
        key = `key ${counter}`

    $('#todo-list').append(
        $('<li></li>')
            .addClass('list-group-item d-flex')
            .attr('key', key)
            .append(
                $('<input type="checkbox" />')
                    .addClass("form-check-input")
                    .addClass("flex-shrink-0")
                    .on('change', handleChecked)
            )
            .append(
                $('<input type="text">')
                    .attr('placeholder', `New Item ${counter}`)
                    .attr('value', value)
                    .addClass('form-control ms-2')
                    .on('blur', handleBlur)
            )
            .append(
                $('<button>-</button>')
                    .addClass('btn btn-primary')
                    .addClass('bg-theme border-0')
                    .addClass('flex-shrink-0')
                    .on('click', () => remove(key))
            )
    )
    return key
}

function add() {
    let key = newNode()

    todos[key] = ""
    save()

    counter += 1
    store.setItem(LS_KEY_COUNTER, counter)
}

function clear(){
    window.localStorage.clear()
    counter = 0
    todos = {}

    $('#todo-list').empty()
}

// Init
$('button.add').on('click', add)
$('button.clear').on('click', clear)
for(let key in todos) {
    let val = todos[key]
    newNode(key, val)
}