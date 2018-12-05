#!/bin/bash

build_user_ui () {
    echo Build user ui
    cd lotto-front-main/lotto-front && ng b --prod user-front
    cd ../../
}

build_admin_ui() {
    echo Build admin ui
    echo Build user ui
    cd lotto-front-main/lotto-front && ng b --prod admin-front
    cd ../../
}

commit() {
    echo Enter commit message
    read message
    git add .
    echo $message | git commit -F -
    tag
}

tag() {
    echo tag
    echo Enter commit tag
    read tag_message
    echo $tag_message | git commit -F -

    echo Do you want want to deploy this tag?
    read doTag

    if [ $doTag = y ]
    then
        deploy $doTag
    fi 
}

deploy() {
    echo deploy $1
    git push origin $1
}

echo =====================================
echo = Do you want to build the user ui? =
echo =             y/n                   =
echo =====================================

read print_user_ui

if [ $print_user_ui = y ]
then
    build_user_ui
fi

echo ======================================
echo = Do you want to build the admin ui? =
echo =             y/n                    =
echo ======================================

read print_admin_ui

if [ $print_admin_ui = y ]
then
    build_admin_ui
fi

echo ======================================
echo = Do you commit all files?           =
echo =             y/n                    =
echo ======================================

read print_commit

if [ $print_commit = y ]
then
    commit
fi