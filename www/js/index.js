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

let counter = 0;

function remove(key) {
    let ele = document.getElementById('todo-list')
    let toRemove = ele.querySelector(`li[key='${key}']`)
    if(!toRemove) {
        console.warn("remove: element not found.")
        return
    }

    ele.removeChild(toRemove)
}

function add() {
    console.log("add:")
    let ele = document.getElementById('todo-list')

    let newTodo = document.createElement('li')
    newTodo.classList.add('list-group-item')
    newTodo.classList.add('list-group-item-action')
    newTodo.classList.add('d-flex')
    newTodo.classList.add('justify-content-between')

    let key = `${counter}`
    newTodo.setAttribute('key', key)

    // text input
    let input = document.createElement(`input`)
    input.setAttribute('placeholder', `New Item ${counter}`) 
    newTodo.appendChild(input)

    // del btn
    let removeBtn = document.createElement('button')
    removeBtn.classList.add('btn')
    removeBtn.classList.add('btn-primary')
    removeBtn.classList.add('bg-theme')
    removeBtn.classList.add('border-0')

    let txt = document.createTextNode('-')
    removeBtn.appendChild(txt)

    removeBtn.addEventListener('click', (e) => {
        remove(key)
    })
    newTodo.appendChild(removeBtn)

    // final
    counter += 1
    ele.appendChild(newTodo)
}

// Init
let addBtn = document.querySelector('button.add')
addBtn.addEventListener('click', add)

add()
add()