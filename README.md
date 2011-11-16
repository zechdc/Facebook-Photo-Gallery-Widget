Description:
============
This JS script grabs all albums and displays them. When you click on an album it shows the photos in that album. If you click on a photo it brings up a lightbox. It is 100% jQuery. See notes at the bottom for more details.

Live Example:
-------------
<a href="http://billboardsclub.com/photos.php">DEMO</a>

How to Use:
-----------
See index.html for simple working example.
<ol>
	<li>Create new facebook app. (https://developers.facebook.com/apps)</li>
	<li>Make sure you include the lightbox js file and css file</li>
	<li>Make sure you include the facebook JS SDK file</li>
	<li>Make sure you include the Facebook_Photo_Gallery_Widget JS file</li>
	<li>Include a div or any other html tag with the id "fb_gallery"</li>
	<li>Set custom attribute app_id=""</li>
	<li>Set custom attribute page_id=""</li>
</ol>


JavaScript Files to be included (Steps 2 - 4):
----------------------------------------------

    <!-- Load jQuery -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>

    <!-- Load LightBox - Used by Facebook Photo Gallery Widget -->
    <script type="text/javascript" src="js/jquery.lightbox-0.5.js"></script>

    <link rel="stylesheet" type="text/css" href="css/jquery.lightbox-0.5.css" media="screen" />

    <!-- Load Facebook JS SDK - Used by Facebook Photo Gallery Widget -->
    <script src="http://connect.facebook.net/en_US/all.js"></script>

    <!-- Load Facebook Photo Gallery Widget -->
    <script src="/js/fb_gallery.js"></script>

Include a Div where you want the gallery (Steps 5 - 7):
------------------------------------------------------

    <div id="fb_gallery" app_id="" page_id=""></div>


Notes:
------
 * You get an app_id after you create a new app
 * You can find the page id by visiting that page in your browser.
   * https://www.facebook.com/pages/Club-Billboards/104821622923594
   * In the url above, the number at the end it the page_id. You can only use public pages, not peoples profiles.
 * There is no CSS applied currently other than what the lightbox has applied.
 * You don't have to worry about include facebooks <div id="fb-root">. But if you have already included, just remove it from the fb_gallery.js file.