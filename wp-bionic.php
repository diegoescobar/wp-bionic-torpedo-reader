<?php
/*
Plugin Name: Wordpress Bionic Reader
Plugin URI: http://diegoescobar.ca/bionic
Description: Bionic Reader added to Wordpress for assessibility.
Author: Diego Escobar
Version: 0.1
Author URI: http://diegoescobar.ca
*/

function bionic_scripts() {
    wp_enqueue_script( 'wp_bionic-reading', plugin_dir_url( __FILE__ ) . 'js/wp-bionical-reader.js', array(), time(), true );
}
add_action( 'wp_enqueue_scripts', 'bionic_scripts' );