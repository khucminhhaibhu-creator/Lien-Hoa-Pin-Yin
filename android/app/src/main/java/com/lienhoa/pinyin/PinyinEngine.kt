package com.lienhoa.pinyin

object PinyinEngine {
    private val tones = mapOf(
        'a' to listOf("a", "ā", "á", "ǎ", "à"),
        'e' to listOf("e", "ē", "é", "ě", "è"),
        'i' to listOf("i", "ī", "í", "ǐ", "ì"),
        'o' to listOf("o", "ō", "ó", "ǒ", "ò"),
        'u' to listOf("u", "ū", "ú", "ǔ", "ù"),
        'ü' to listOf("ü", "ǖ", "ǘ", "ǚ", "ǜ")
    )

    fun tone(text: String, tone: Int): String {
        if (tone !in 1..4 || text.isEmpty()) return text
        val chars = text.toCharArray()
        var index = -1
        for (i in chars.indices.reversed()) {
            if (chars[i].lowercaseChar() in "aeo") { index = i; break }
        }
        if (index == -1) {
            for (i in chars.indices.reversed()) {
                if (chars[i].lowercaseChar() in "iuü") { index = i; break }
            }
        }
        if (index == -1) return text
        val replacement = tones[chars[index].lowercaseChar()]?.getOrNull(tone) ?: return text
        return text.substring(0, index) + replacement + text.substring(index + 1)
    }
}
