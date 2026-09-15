package com.lienhoa.pinyin

import android.app.Activity
import android.os.Bundle
import android.widget.TextView

class SettingsActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(TextView(this).apply {
            text = "LIÊN HOA PINYIN KEYBOARD\n\nHỌC ĐỂ THAY ĐỔI\n\nAndroid IME"
            textSize = 20f
            setPadding(40, 60, 40, 40)
        })
    }
}
