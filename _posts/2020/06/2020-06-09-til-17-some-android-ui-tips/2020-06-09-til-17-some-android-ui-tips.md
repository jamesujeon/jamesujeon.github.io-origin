---
layout: post
title:  "TIL 17: 자잘한 안드로이드 UI 팁들"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [android, ui]
---

## TL;DR

1. `RecyclerView` 항목들이 서로 잘리지 않게 하고 싶은 경우
2. `DrawerLayout`로 사이드 화면을 열었을 때, 뒤의 컨텐츠 부분이 클릭되는 경우
3. 버튼의 그림자를 제거하고 싶은 경우
4. 이미지를 너비는 꽉 채우되, 비율에 따라 높이를 동적으로 설정하고 싶은 경우
5. `ViewPager`를 빠르게 스크롤 할 때, 흰 배경이 보이는 경우
6. 상태바 높이를 얻고 싶은 경우
7. `Bottom Sheet Dialog`의 드래그 동작을 막고 싶은 경우
8. `EditText` 내부 스크롤을 활성화하고 싶은 경우

## 자잘한 안드로이드 UI 팁들

안드로이드 개발을 하면서 느끼는 점은 iOS 개발도 불편한 부분이 많았지만, 안드로이드는 더 심한 것처럼 느껴진다.
정말 쉽게 처리될 것 같은 부분도 직접 해보면 편법인지 아닌지도 모르겠는 편법같은 처리를 해야 되는 부분도 있고 해서 참으로 힘들다.
그래서 이런 자잘한 처리들을 모아 라이브러리를 만들어 두고두고 쓰면 좋을 것 같다는 생각이 들었다.
언제 만들지는 모르지만...

### 1. `RecyclerView` 항목들이 서로 잘리지 않게 하고 싶은 경우

`RecyclerView`에 `clipChildren`을 `false`로 설정한다.  
그러면, 자식들이 서로 자르지 않는다.

### 2. `DrawerLayout`로 사이드 화면을 열었을 때, 뒤의 컨텐츠 부분이 클릭되는 경우

사이드 화면의 레이아웃에 `clickable`, `focusable`을 `true`로 설정한다.  
사이드 화면이 클릭 가능하게 함으로써 막는다.

### 3. 버튼의 그림자를 제거하고 싶은 경우

`stateListAnimator`를 `@null`로 설정한다.

### 4. 이미지를 너비는 꽉 채우되, 비율에 따라 높이를 동적으로 설정하고 싶은 경우

`adjustViewBounds`를 `true`로, 너비를 `match_parent`로 설정한다.  
반대의 경우는 너비와 높이를 바꿔 생각하면 된다.

### 5. `ViewPager`를 빠르게 스크롤 할 때, 흰 배경이 보이는 경우

`ViewPager`의 `offscreenPageLimit`를 적절하게 설정해 페이지를 미리 로딩하도록 한다.  
복잡한 뷰일수록 수치를 낮게 설정해야 과부하가 걸리지 않는다.

### 6. 상태바 높이를 얻고 싶은 경우

상태바 높이에 해당하는 리소스를 찾아내 구할 수 있다.

{% highlight java %}
public static int getStatusBarHeight(Context context) {
    Resources resources = context.getResources();
    int resourceId = resources.getIdentifier(
        "status_bar_height", "dimen", "android"
    );

    return resourceId > 0 ? resources.getDimensionPixelSize(resourceId) : 0;
}
{% endhighlight %}

### 7. `Bottom Sheet Dialog`의 드래그 동작을 막고 싶은 경우

`BottomSheetBehavior`에 다음과 같은 콜백을 추가한다.

{% highlight java %}
behavior.addBottomSheetCallback(new BottomSheetBehavior.BottomSheetCallback() {
    @Override
    public void onStateChanged(@NonNull View bottomSheet, int newState) {
        if (newState == BottomSheetBehavior.STATE_DRAGGING) {
            behavior.setState(BottomSheetBehavior.STATE_EXPANDED);
        }
    }

    @Override
    public void onSlide(@NonNull View bottomSheet, float slideOffset) {}
});
{% endhighlight %}

### 8. `EditText` 내부 스크롤을 활성화하고 싶은 경우

다음과 같은 터치 리스너를 추가한다.

{% highlight java %}
editText.setOnTouchListener((v, event) -> {
    if (editText.hasFocus()) {
        v.getParent().requestDisallowInterceptTouchEvent(true);
        if ((event.getAction() & MotionEvent.ACTION_MASK) == MotionEvent.ACTION_SCROLL) {
            v.getParent().requestDisallowInterceptTouchEvent(false);
            return true;
        }
    }
    return false;
});
{% endhighlight %}
