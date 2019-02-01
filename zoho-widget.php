<html>
<head>

	<script type="text/javascript" id="zsiqscript" defer="" src="https://salesiq.zoho.com/widget"></script>
	<script type="text/javascript">
        _IS_PREVIEW = true;
        var SIQ_FLOAT = 1, SIQ_BUTTON = 2, SIQ_PERSONALIZE = 3, SIQ_SIGNATURE = 4, SIQ_CHATWINDOW = 5;
        var widgetdata = parent.EmbedConfig.getWidgetData();
        var widgcode = widgetdata.widgetcode;
        _WIDGETPREV_MODE = widgetdata.prevmode;
        _MODIFIED_WIDGET_OBJ = widgetdata.widgetobj;
        _WIDGETTYPE = "5";
        _WINDOW_REPOPULATE = false;
        var $zoho = $zoho || {};
        $zoho.salesiq = $zoho.salesiq || {
            widgetcode: widgcode, values: {}, ready: function() {
            }
        };
        var d = document;
        s = d.createElement("script");
        s.type = "text/javascript";
        s.id = "zsiqscript";
        s.defer = true;
        s.src = "https://salesiq.zoho.com/widget";
        t = d.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(s, t);
        d.write("<div id='zsiqwidget'></div>");

        function updatePreviewConfig(config) {
            if (config.prevmode){
                _WIDGETPREV_MODE = config.prevmode;
                delete config.prevmode;
            }

            if (config.windowrepopulate){
                _WINDOW_REPOPULATE = config.windowrepopulate;
            }
            delete config.windowrepopulate;

            if (config.status == true || config.status == false){
                if (_WIDGETTYPE == SIQ_FLOAT){
                    delete $ZSIQUtil.getAPIValues().floatvisible;
                }
                else if (_WIDGETTYPE == SIQ_BUTTON){
                    delete $ZSIQUtil.getAPIValues().buttonvisible;
                }
            }

            _MODIFIED_WIDGET_OBJ = config;
            $ZSIQChat.updatePreviewConfig();
            $ZSIQWidget.init(true);
        }

        function getChatwindow() {
            return document.getElementById("siqiframe");
        }
	</script>
	<link rel="stylesheet" href="https://css.zohostatic.com/salesiq/Jan_30_2019_2_https/styles/floatbutton.css">
	<script src="https://js.zohostatic.com/salesiq/Jan_30_2019_2_https/js/floatbutton.js"></script>
</head>
<body>
<div id="zsiqwidget"></div>
<script type="text/javascript">
    $zoho.salesiq.ready = function() {
        $zoho.salesiq.tracking.off();
        if (_WIDGETTYPE == SIQ_FLOAT || _WIDGETTYPE == SIQ_PERSONALIZE){
            $zoho.salesiq.floatbutton.visible("show");//No I18N
            $zoho.salesiq.floatwindow.visible("hide");//No I18N
        }
        else if (_WIDGETTYPE == SIQ_BUTTON){
            $zoho.salesiq.chatbutton.visible("show");//No I18N
            $zoho.salesiq.chatwindow.visible("hide");//No I18N
        }
        else if (_WIDGETTYPE == SIQ_CHATWINDOW){
            $zoho.salesiq.floatwindow.visible("show");//No I18N
            $zoho.salesiq.chatwindow.visible("show");//No I18N
            $zoho.salesiq.floatbutton.visible("hide");//No I18N
            $zoho.salesiq.chatbutton.visible("hide");//No I18N

        }
    }

</script>

<style>

	.input_tip {
		opacity: 1;
		display: inline-block;
		position: absolute;
		z-index: 5;
		width: calc(100% + 50px);
		background-color: #f0f0f0;
		left: -7px;
		top: -7px;
		border-radius: 5px;
		box-shadow: 2px 5px 11px -2px #ccc5c5;
		height: 83px;
	}

	.input_tip .chbx_main {
		margin: 55px 0 0 10px;
	}

	body {
		overflow: hidden;
	}

	.zsiq_flt_rel, .sqico-chat, .sqico-chat_min, #zsiq_btn img {
		transform: scale(0.69);
		-webkit-transform: scale(0.69);
		-moz-transform: scale(0.69);
		-o-transform: scale(0.69);
		-ms-transform: scale(0.69);
		position: relative;
	}

	.zsiq_flt_rel, .zsiq_btn_rel, #zsiqbtn .sqico-chat, #zsiqbtn .sqico-chat_min, #zsiq_btn img {
		-webkit-transform-origin: right bottom;
		-moz-transform-origin: right bottom;
	}

	.siq_tR .zsiq_flt_rel {
		-webkit-transform-origin: right top;
		-moz-transform-origin: right top;
	}

	.siq_tL .zsiq_flt_rel {
		-webkit-transform-origin: left top;
		-moz-transform-origin: left top;
	}

	.siq_bL .zsiq_flt_rel {
		-webkit-transform-origin: left bottom;
		-moz-transform-origin: left bottom;
	}

	.siq_lM .zsiq_flt_rel {
		-webkit-transform-origin: left;
		-moz-transform-origin: left;
	}

	.siq_rM .zsiq_flt_rel {
		-webkit-transform-origin: right;
		-moz-transform-origin: right;
	}

	#zsiqbtn .sqico-chat, #zsiqbtn .sqico-chat_min, #zsiq_btn img {
		position: fixed;
		bottom: 10px;
		right: 10px;
	}

	.zsiq_theme8 .zsiq_flt_rel {
		width: auto;
	}

	.zsiq_floatmain, .zsiq_custommain, .zsiq_theme1 div.zsiq_cnt {
		animation: none;
		-webkit-animation: none;
		-moz-animation: none;
		-o-animation: none;
		-ms-animation: none;
		-webkit-transition: none;
		-moz-transition: none;
		-o-transition: none;
		transition: none;
	}

	.zsiq_flt_rel8.sqico-chat_min {
		transform: scale(1);
		-webkit-transform: skew(-15deg);
		-moz-transform: skew(-15deg);
		-o-transform: skew(-15deg);
		-ms-transform: skew(-15deg);
		zoom: 75%;
		margin-right: 30px;
	}

	.zsiq_theme11.siq_lM .zsiq_flt_rel, .zsiq_theme11.siq_tL .zsiq_flt_rel, .zsiq_theme11.siq_bL .zsiq_flt_rel {
		left: 22px;
		-webkit-transform-origin: left center;
		-moz-transform-origin: left center;
	}

	.zsiq_wrap {
		transform: scale(0.53);
		-webkit-transform: scale(0.53);
		-moz-transform: scale(0.53);
		-webkit-transform-origin: bottom right;
		-moz-transform-origin: bottom right;;
		right: 10px;
		bottom: 10px;
	}

	@media only screen and (max-width: 555px) and (min-width: 100px) {
		.zsiq_floatmain {
			bottom: 10px;
			right: 10px;
			top: auto;
			left: auto;
		}

		.zsiq_flt_rel {
			position: relative;
		}

		.zsiq_flt_rel, .sqico-chat, .sqico-chat_min, #zsiq_btn img {
			transform: scale(0.6);
			-webkit-transform: scale(0.6);
			-moz-transform: scale(0.6);
			-o-transform: scale(0.6);
			-ms-transform: scale(0.6);
		}

		.zsiq_floatmain .zsiq_flt_rel {
			-webkit-transform-origin: bottom right;
			-moz-transform-origin: bottom right;
		}
	}

	.siqtrans.siqanim, .siqtrans.siqtrans {
		animation: none;
		transition: none;
		transform: none;
		-webkit-animation: none;
		-webkit-transition: none;
		-webkit-transform: none;
		-moz-animation: none;
		-moz-transition: none;
		-moz-transform: none;
		-ms-animation: none;
		-ms-transition: none;
		-ms-transform: none;
		-o-animation: none;
		-o-transition: none;
		-o-transform: none;
	}

	.zls-sptwndw, [embedtheme], [embedtheme] iframe {
		top: 0 !important;
		left: 0px !important;
	}

	[embedtheme='1'] iframe {
		box-shadow: none;
	}

</style>


<div class="zsiq_floatmain zsiq_theme1 siq_bR siq_noanim zsiqfanim siq_noanim" style="visibility: hidden; display: block; height: 60px;">
	<div id="zsiq_float" class="zsiq_float " style="font-family:salesiq-font">
		<div class="zsiq_flt_rel"><em id="zsiq_agtpic" class="zsiq_user siqico-chat"></em>
			<div id="titlediv" class="zsiq_cnt zsiq_min zsiq_min">
				<div id="zsiq_maintitle" class="zsiq_ellips" title="We're Online!">We're Online!</div>
				<p id="zsiq_byline" class="zsiq_ellips" title="How may I help you today?">How may I help you today?</p>
			</div>
			<em id="zsiq_unreadcnt" class="zsiq_unrdcnt" style="display: none;"></em><em id="zsiq_avcall" class="zsiqmin_unrdcnt zsiq_unrdcnt siqico-mincall" style="display: none;"></em>
		</div>
	</div>
</div>
<style id="floatthemecss">.zsiq_flt_rel {
		background-color: #AFB0B3 !important;
	}

	.zsiq_seasonal .st2 {
		fill: #AFB0B3 !important;
	}</style>
<div style="visibility: hidden;" class="zls-sptwndw  siqembed siqtrans zsiq-newtheme siq_rht zsiq_size2 siqanim" embedtheme="4">
	<div id="siqcht" class="zls-prelative">
		<iframe id="siqiframe" seamless="seamless" width="100%" height="460"></iframe>
	</div>
</div>
</body>
</html>