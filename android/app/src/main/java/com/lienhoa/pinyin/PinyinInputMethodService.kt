package com.lienhoa.pinyin

import android.graphics.Color
import android.inputmethodservice.InputMethodService
import android.view.Gravity
import android.view.View
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView

class PinyinInputMethodService : InputMethodService() {
    private lateinit var root: LinearLayout
    private val input get() = currentInputConnection

    override fun onCreateInputView(): View {
        root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(6, 6, 6, 6)
            setBackgroundColor(Color.rgb(250, 247, 240))
        }
        val header = TextView(this).apply {
            text = "LIÊN HOA PINYIN  •  HỌC ĐỂ THAY ĐỔI"
            setTextColor(Color.WHITE)
            setBackgroundColor(Color.rgb(181, 18, 27))
            gravity = Gravity.CENTER
            textSize = 14f
            setPadding(4, 14, 4, 14)
        }
        root.addView(header, LinearLayout.LayoutParams(-1, 52))
        listOf(
            "a e i o u ü",
            "ā á ǎ à ē é ě è",
            "ī í ǐ ì ō ó ǒ ò",
            "ū ú ǔ ù ǖ ǘ ǚ ǜ",
            "1 2 3 4 5 v ⌫",
            "， 。 ？ ！ SPACE ↵"
        ).forEach { addRow(it.split(" ")) }
        return root
    }

    private fun addRow(keys: List<String>) {
        val row = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL }
        keys.forEach { key ->
            val b = Button(this).apply {
                text = key
                textSize = if (key.length > 1) 13f else 17f
                setOnClickListener { press(key) }
            }
            row.addView(b, LinearLayout.LayoutParams(0, 58, 1f))
        }
        root.addView(row)
    }

    private fun press(key: String) {
        when (key) {
            "⌫" -> input?.deleteSurroundingText(1, 0)
            "↵" -> input?.sendKeyEvent(android.view.KeyEvent(android.view.KeyEvent.ACTION_DOWN, android.view.KeyEvent.KEYCODE_ENTER))
            "SPACE" -> input?.commitText(" ", 1)
            "v" -> input?.commitText("ü", 1)
            "1", "2", "3", "4" -> {
                val tone = key.toInt()
                val before = input?.getTextBeforeCursor(32, 0)?.toString() ?: ""
                if (before.isNotEmpty()) {
                    val converted = PinyinEngine.tone(before, tone)
                    if (converted != before) {
                        input?.deleteSurroundingText(before.length, 0)
                        input?.commitText(converted, 1)
                    }
                }
            }
            "5" -> input?.commitText("", 1)
            "，", "。", "？", "！" -> input?.commitText(key, 1)
            else -> input?.commitText(key, 1)
        }
    }
}
