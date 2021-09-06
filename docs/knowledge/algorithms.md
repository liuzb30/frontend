# 算法

## 链表

### 1.知识点

什么是链表，链表是一种通过指针串联在一起的线性结构，每一个节点由两部分组成，一个是数据域，一个是指针域（存放下一个节点的指针），最后一个节点的指针域指向null。

#### 链表的类型

单链表：每个节点只有一个指针域，指向下一个节点。

双链表：每个节点有两个指针域，一个指向上一个节点，一个指向下一个节点。

循环链表：链表收尾相连。

#### 链表的存储方式

数组在内存中是连续分布的

链表是通过指针域的指针链接内存中的各个节点，所以链表中的节点在内存中不是连续分布的。

#### 链表的操作

##### 删除节点

删除D节点，如图所示：

![链表-删除节点](https://img-blog.csdnimg.cn/20200806195114541.png)

只要将C节点的next指针 指向E节点就可以了。

##### 添加节点

如图所示：

![链表-添加节点](https://img-blog.csdnimg.cn/20200806195134331.png)

可以看出链表的增添和删除都是O(1)操作，也不会影响到其他节点。

但是要注意，要是删除第五个节点，需要从头节点查找到第四个节点，通过next指针进行删除操作，查找的时间复杂度是O(n).

#### 性能分析

再把链表的特性和数组的特性进行一个对比，如图所示：

![链表-链表与数据性能对比](https://img-blog.csdnimg.cn/20200806195200276.png)

数组在定义的时候，长度就是固定的，如果想改动数组的长度，就需要重新定义一个新的数组。

链表的长度可以是不固定的，并且可以动态增删， 适合数据量不固定，频繁增删，较少查询的场景。



### 2.移除链表元素

题意：删除链表中等于给定值 val 的所有节点。

```
示例 1：
输入：head = [1,2,6,3,4,5,6], val = 6
输出：[1,2,3,4,5]

示例 2：
输入：head = [], val = 1
输出：[]

示例 3：
输入：head = [7,7,7,7], val = 7
输出：[]
```

[LeetCode 第203题](https://leetcode-cn.com/problems/remove-linked-list-elements/)

##### 思路：

找到需要删除节点的上一个节点，然后把上一个节点的next指向需要删除的节点的下一个节点。如果是头结点呢，则有两种方式，一种是把头结点指向下一个节点，一种是设置一个虚拟头结点，把它的next节点指向头结点，这样就跟删除其他节点一样操作。



```js
// 在原来链表操作
var removeElements = function (head, val) {
    //如果头结点需要删除，则把头结点指向下一个节点
    while (head && head.val === val) {
        head = head.next
    }
    let cur = head
    while (cur && cur.next) {
        if (cur.next.val === val) {
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }
    return head
}
```

```js
// 设置一个虚拟头结点
var removeElements = function (head, val) {
    if (!head) return null
    let cur = dummyHead = new ListNode(0, head)
    while (cur && cur.next) {
        if (cur.next.val === val) {
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }
    return dummyHead.next
};
```

[LeetCode 第707题](https://leetcode-cn.com/problems/design-linked-list/)



### 3.设计链表

题意：

在链表类中实现这些功能：

- get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
- addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
- addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
- addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val 的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
- deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。



```js
// @lc code=start
var ListNode = function (val, next) {
    this.val = val
    this.next = next
}
/**
 * Initialize your data structure here.
 */
var MyLinkedList = function () {
    this.head = null
    this.tail = null
    this.size = 0
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.getNode = function (index) {
    // 判断边界条件
    if (index < 0 || index >= this.size) return null
    let node = this.head
    while (index-- > 0) {
        node = node.next
    }
    return node
};

MyLinkedList.prototype.get = function (index) {
    if (index < 0 || index >= this.size) return -1
    return this.getNode(index).val
}

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
    const node = new ListNode(val, this.head)
    this.head = node
    if (!this.tail) {
        this.tail = this.head
    }
    this.size++
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
    const node = new ListNode(val)
    if (!this.tail) {
        this.head = this.tail = node
    } else {
        this.tail.next = node
        this.tail = node
    }
    this.size++
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
    if (index <= 0) return this.addAtHead(val)
    if (index === this.size) return this.addAtTail(val)
    if (index > this.size) return
    const node = this.getNode(index - 1)
    node.next = new ListNode(val, node.next)
    this.size++
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
    if (index < 0 || index >= this.size) return
    if (index === 0) {
        this.head = this.head.next
        this.size--
        return
    }
    const node = this.getNode(index - 1)
    node.next = node.next.next
    // 处理尾节点
    if (index === this.size - 1) {
        this.tail = node
    }
    this.size--
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
```



### 4.反转链表

题意：反转一个单链表。

示例: 输入: 1->2->3->4->5->NULL 输出: 5->4->3->2->1->NULL

来源: [LeetCode 第 206 题](https://leetcode-cn.com/problems/reverse-linked-list/)

##### 思路：

改变链表的next指针的指向，直接将链表反转。

##### 迭代法

```js
var reverseList = function (head) {
  let pre = null, cur = head
  while (cur) {
    let next = cur.next
    // 把next指针指向前面节点
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}
```

##### 递归法

```js
var reverseList = function (head) {
  const reverse = (pre, cur) => {
    if (!cur) return pre
    let next = cur.next
    cur.next = pre
    return reverse(cur, next)
  }
  return reverse(null, head)
}

var reverseList = function (head) {
  const reverse = (node) => {
    if (!node || !node.next) return node
    // 找到尾节点
    let tail = reverse(node.next)
    // 修改节点的next指向
    node.next.next = node
    node.next = null
    return tail
  }
  return reverse(head)
}
```



### 5.两两交换链表中的节点

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

**你不能只是单纯的改变节点内部的值**，而是需要实际的进行节点交换。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg)

```
输入：head = [1,2,3,4]
输出：[2,1,4,3]
```

**示例 2：**

```
输入：head = []
输出：[]
```

**示例 3：**

```
输入：head = [1]
输出：[1]
```

来源: [LeetCode 第 24 题](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

##### 思路：

使用虚拟头结点，然后就是交换相邻两个元素，这时一定要画图，不画图，操作多个指针很容易乱。

初始时，cur指向虚拟头结点，然后进行如下三步：

![24.两两交换链表中的节点1](https://code-thinking.cdn.bcebos.com/pics/24.%E4%B8%A4%E4%B8%A4%E4%BA%A4%E6%8D%A2%E9%93%BE%E8%A1%A8%E4%B8%AD%E7%9A%84%E8%8A%82%E7%82%B91.png)



##### 迭代法

```js
var swapPairs = function (head) {
    let cur = dummyHead = new ListNode(null, head)
    let node1, node2
    while (cur.next && cur.next.next) {
        node1 = cur.next
        node2 = cur.next.next
        node1.next = node2.next
        node2.next = node1
        cur.next = node2
        cur = node1
    }
    return dummyHead.next
}
```

##### 递归法

递归的写法相对简洁点

```js
var swapPairs = function (head) {
    if (!head || !head.next) return head
    let next = head.next
    let nextHead = swapPairs(head.next.next)
    next.next = head
    head.next = nextHead
    return next
}
```



### 6.删除链表的倒数第N个节点

给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

**进阶：**你能尝试使用一趟扫描实现吗？

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg)

```
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

**示例 2：**

```
输入：head = [1], n = 1
输出：[]
```

**示例 3：**

```
输入：head = [1,2], n = 1
输出：[1]
```

来源: [LeetCode 第 19 题](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

##### 思路：

由于要删除倒数第n个节点，那我们就得找到倒数第n+1个节点，我们知道单链表只能往后找，那怎么找倒数第n+1个呢？刚开始的想法是先遍历一遍，算出链表的长度，然后再减去n+1个，算出要遍历的次数，就能找到我们要删除的节点的前一个节点。但是这样的话需要遍历两遍，不符合题意。看了别人的解法才知道，原来还可以用双指针，让快指针先走n+1步，然后慢指针和快指针同时走，当快指针走到结尾，慢指针也就是我们要找的节点。

```js
var removeNthFromEnd = function (head, n) {
    let dummyHead = new ListNode(0, head)
    let slow = dummyHead, fast = dummyHead
    while (n--) {
        fast = fast.next
    }
    while (fast && fast.next) {
        fast = fast.next
        slow = slow.next
    }
    slow.next = slow.next.next
    return dummyHead.next
};
```



### 7.链表相交

给定两个（单向）链表，判定它们是否相交并返回交点。请注意相交的定义基于节点的引用，而不是基于节点的值。换句话说，如果一个链表的第k个节点与另一个链表的第j个节点是同一节点（引用完全相同），则这两个链表相交。

示例 1：

输入：listA = [4,1,8,4,5], listB = [5,0,1,8,4,5]

输出：Reference of the node with value = 8

输入解释：相交节点的值为 8 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。

来源: [LeetCode 02.07. 链表相交](https://leetcode-cn.com/problems/intersection-of-two-linked-lists-lcci/)

### 8.环形链表

给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 `null`。

为了表示给定链表中的环，我们使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 `pos` 是 `-1`，则在该链表中没有环。**注意，`pos` 仅仅是用于标识环的情况，并不会作为参数传递到函数中。**

**说明：**不允许修改给定的链表。

**进阶：**

- 你是否可以使用 `O(1)` 空间解决此题？

来源: [LeetCode 第 142 题](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

##### 思路：

利用快慢指针，当快慢指针相遇的时候，再弄一个新的指针从head开始走，慢指针也开始走，当新指针和慢指针相遇的时候就是环的起点。

假设从头结点到环形入口节点 的节点数为x。 环形入口节点到 fast指针与slow指针相遇节点 节点数为y。 从相遇节点 再到环形入口节点节点数为 z。 如图所示：

![142环形链表2](https://img-blog.csdnimg.cn/20210318162938397.png)

那么相遇时： slow指针走过的节点数为: `x + y`， fast指针走过的节点数：`x + y + n (y + z)`，n为fast指针在环内走了n圈才遇到slow指针， （y+z）为 一圈内节点的个数A。

因为fast指针是一步走两个节点，slow指针一步走一个节点， 所以 fast指针走过的节点数 = slow指针走过的节点数 * 2：

```
(x + y) * 2 = x + y + n (y + z)
```

两边消掉一个（x+y）: `x + y = n (y + z)`

因为要找环形的入口，那么要求的是x，因为x表示 头结点到 环形入口节点的的距离。

所以要求x ，将x单独放在左面：`x = n (y + z) - y` ,

再从n(y+z)中提出一个 （y+z）来，整理公式之后为如下公式：`x = (n - 1) (y + z) + z` 注意这里n一定是大于等于1的，因为 fast指针至少要多走一圈才能相遇slow指针。

这个公式说明什么呢？

先拿n为1的情况来举例，意味着fast指针在环形里转了一圈之后，就遇到了 slow指针了。

当 n为1的时候，公式就化解为 `x = z`，

这就意味着，**从头结点出发一个指针，从相遇节点 也出发一个指针，这两个指针每次只走一个节点， 那么当这两个指针相遇的时候就是 环形入口的节点**。

```js
var detectCycle = function (head) {
  if (!head || !head.next) return null;
  let slow = head.next, fast = head.next.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast == slow) {
      slow = head;
      while (fast !== slow) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }
  return null;
}
```



## 哈希表

### 1.两个数组的交集

给定两个数组，编写一个函数来计算它们的交集。

**示例 1：**

```
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
```

**说明：**

- 输出结果中的每个元素一定是唯一的。
- 我们可以不考虑输出结果的顺序。

来源: [LeetCode 第 349 题](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

#### 思路：

题目特意说明输出结果每个元素都是唯一的，所以可以使用Set来进行去重。需要用到两个Set，一个用来存放nums1的值，一个是用来存放结果。

```js
var intersection = function (nums1, nums2) {
    let num1Set = new Set(nums1)
    let resSet = new Set()
    for (let i = 0; i < nums2.length; i++) {
        if (num1Set.has(nums2[i])) {
            resSet.add(nums2[i])
        }
    }
    return Array.from(resSet)
};
```



### 2.两数之和

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

**示例**:

```text
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

来源: [LeetCode 第 1 题](https://leetcode-cn.com/problems/two-sum/submissions/)

#### 代码实现

我们可能一开始想到的是用双层循环暴力破解，但这个效率非常低，时间复杂度是 O(n^2)。那有没有更加高效的解决方法，答案是有的，就是利用哈希表。

```js
var twoSum = function (nums, target) {
    let map = {}
    for (let i = 0; i < nums.length; i++) {
        if (map[nums[i]] !== undefined) {
            return [map[nums[i]], i]
        } else {
            map[target - nums[i]] = i
        }
    }
};
```



### 3.三数之和

给你一个包含 `n` 个整数的数组 `nums`，判断 `nums` 中是否存在三个元素 *a，b，c ，*使得 *a + b + c =* 0 ？请你找出所有和为 `0` 且不重复的三元组。

**注意：**答案中不可以包含重复的三元组。

**示例 1：**

```
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
```

#### 思路1：哈希表

跟两数相加的思路类似，只是加多了一个循环。还有一点需要注意的，就是不能包含重复的三元组。可以利用Set集合进行去重，因为Set无法对数组进行去重，所以需要把数组转成字符串。

```js
var threeSum = function (nums) {
  let set = new Set()
  let res = []
  for (let i = 0; i < nums.length - 2; i++) {
    let map = {}
    for (let j = i + 1; j < nums.length; j++) {
      if (map[nums[j]]) {
        let arr = [nums[i], nums[j], 0 - nums[i] - nums[j]]
        // 对数组进行排序，然后转成字符串，利用Set进行去重
        arr.sort()
        set.add(arr.toString())
      } else {
        map[0 - nums[i] - nums[j]] = 1
      }
    }
  }
  set.forEach(item => res.push(item.split(',')))
  return res
}
```

#### 思路2：双指针

先对数组进行升序排序，然后遍历数组，i从下标0的位置开始，同时定义两个指针left和right，left从下标i+1的位置，right从结尾开始。

接下来如何移动left 和right呢， 如果nums[i] + nums[left] + nums[right] > 0 就说明 此时三数之和大了，因为数组是排序后了，所以right下表就应该向左移动，这样才能让三数之和小一些。

如果 nums[i] + nums[left] + nums[right] < 0 说明 此时 三数之和小了，left 就向右移动，才能让三数之和大一些，直到left与right相遇为止。

时间复杂度：O(n^2)。

```js
var threeSum = function (nums) {
  const len = nums.length
  const res = []
  if (len < 3) return []
  // 对数组进行升序排序
  nums.sort((a, b) => a - b)
  for (let i = 0; i < len - 2; i++) {
    // 去重
    if (nums[i] === nums[i - 1]) continue
    let l = i + 1, r = len - 1
    while (l < r) {
      let sum = nums[i] + nums[l] + nums[r]
      if (sum > 0) {
        r--;
        continue;
      }
      if (sum < 0) {
        l++;
        continue
      }
      res.push([nums[i], nums[l], nums[r]])
      // 去重
      while (l < r && nums[l] === nums[++l]) { }
      while (l < r && nums[r] === nums[--r]) { }
    }
  }
  return res
}
```



## 字符串

### 1.反转字符串

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 `char[]` 的形式给出。

不要给另外的数组分配额外的空间，你必须**[原地](https://baike.baidu.com/item/原地算法)修改输入数组**、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 [ASCII](https://baike.baidu.com/item/ASCII) 码表中的可打印字符。

**示例 1：**

```
输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

来源: [LeetCode 第 344 题](https://leetcode-cn.com/problems/reverse-string/)

##### 思路：

利用双指针，左指针从头部开始，右指针从尾部开始，然后交换左右指针的值，直到左指针不小于右指针。

```js
var reverseString = function (s) {
    let l = -1, r = s.length
    while (++l < --r) {
        [s[l], s[r]] = [s[r], s[l]]
    }
    return s
};
```



### 2.反转字符串||

给定一个字符串 `s` 和一个整数 `k`，从字符串开头算起，每 `2k` 个字符反转前 `k` 个字符。

- 如果剩余字符少于 `k` 个，则将剩余字符全部反转。
- 如果剩余字符小于 `2k` 但大于或等于 `k` 个，则反转前 `k` 个字符，其余字符保持原样。

 

**示例 1：**

```
输入：s = "abcdefg", k = 2
输出："bacdfeg"
```



##### 思路：

这题跟第一题的思路类似，也是利用双指针进行反转，唯一的区别是要找到反转的区间。由于是没`2k`个字符反转前`k`个字符，我们在遍历的时候间隔可以设置成`2k`，然后把左右指针设置成`i-1`和`i+k`即可。

```js
var reverseStr = function (s, k) {
    let sArr = s.split('')
    for (let i = 0; i < sArr.length; i += 2 * k) {
        let l = i - 1, r = i + k
        while (++l < --r) {
            [sArr[l], sArr[r]] = [sArr[r], sArr[l]]
        }
    }
    return sArr.join('')
};
```



### 3.翻转字符串里的单词

给你一个字符串 `s` ，逐个翻转字符串中的所有 **单词** 。

**单词** 是由非空格字符组成的字符串。`s` 中使用至少一个空格将字符串中的 **单词** 分隔开。

请你返回一个翻转 `s` 中单词顺序并用单个空格相连的字符串。

**说明：**

- 输入字符串 `s` 可以在前面、后面或者单词间包含多余的空格。
- 翻转后单词间应当仅用一个空格分隔。
- 翻转后的字符串中不应包含额外的空格。

**示例 1：**

```
输入：s = "the sky is blue"
输出："blue is sky the"
```

来源：[LeetCode 第 151 题](https://leetcode-cn.com/problems/reverse-words-in-a-string/description/)

##### 思路：

先移除多余的空格，然后再对整个字符串进行反转，最后对每个单词进行反转即可。

举个例子，源字符串为："the sky is blue "

- 移除多余空格 : "the sky is blue"
- 字符串反转："eulb si yks eht"
- 单词反转："blue is sky the"



```js
var reverseWords = function (s) {
    // 转成数组
    let sArr = Array.from(s)
    // 移除多余的空格
    reverseExtraSpaces(sArr)
    // 反转整个数组
    reverse(sArr, 0, sArr.length)
    // 反转每个单词
    let start = 0
    for (let i = 0; i <= sArr.length; i++) {
        if (sArr[i] === ' ' || i === sArr.length) {
            reverse(sArr, start, i - 1)
            start = i + 1
        }
    }
    return sArr.join('')
    function reverseExtraSpaces(sArr) {
        // 移除开始和中间的空格
        let slow = fast = 0
        let len = s.length
        while (fast < len) {
            if (sArr[fast] === ' ' && (fast === 0 || sArr[fast - 1] === ' ')) {
                fast++
            } else {
                sArr[slow++] = sArr[fast++]
            }
        }
        // 移除结尾的空格
        sArr.length = sArr[slow - 1] === ' ' ? slow - 1 : slow
    }
    function reverse(sArr, start, end) {
        let l = start, r = end
        while (l < r) {
            [sArr[l], sArr[r]] = [sArr[r], sArr[l]]
            l++; r--;
        }
    }
};
```



### 4.实现 strStr()

实现 [strStr()](https://baike.baidu.com/item/strstr/811469) 函数。

给你两个字符串 `haystack` 和 `needle` ，请你在 `haystack` 字符串中找出 `needle` 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回 `-1` 。

**说明：**

当 `needle` 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。

对于本题而言，当 `needle` 是空字符串时我们应当返回 0 。这与 C 语言的 [strstr()](https://baike.baidu.com/item/strstr/811469) 以及 Java 的 [indexOf()](https://docs.oracle.com/javase/7/docs/api/java/lang/String.html#indexOf(java.lang.String)) 定义相符。

**示例 1：**

```
输入：haystack = "hello", needle = "ll"
输出：2
```

##### 思路：

本题是经典的KMP题目。KMP最重要的步骤在于构建next数组，也就是前缀表。它的作用在于当匹配的字符不相同时，不需要从头开始匹配，而是从上一个next的元素开始。

```js
var strStr = function (haystack, needle) {
    if (needle.length === 0) return 0
    // 构建next数组
    let hLen = haystack.length, nLen = needle.length
    let next = [0]
    // 从1开始
    for (let i = 1, j = 0; i < nLen; i++) {
        // 前后缀不相同，则向前回退
        while (j > 0 && needle[i] !== needle[j]) j = next[j - 1]
        // 找到相同的前后缀
        if (needle[i] === needle[j]) j++
        // 将前缀的长度赋值给next[i]
        next.push(j)
    }

    for (let i = 0, j = 0; i < hLen; i++) {
        // 当匹配的字符不相同，j要回到前一位对应值的回退位置
        while (j > 0 && haystack[i] !== needle[j]) j = next[j - 1]
        if (haystack[i] === needle[j]) j++
        if (j === nLen) return i - nLen + 1
    }
    return -1
};
```



### 5.实重复的子字符串

给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。

**示例 1:**

```
输入: "abab"

输出: True

解释: 可由子字符串 "ab" 重复两次构成。
```

##### 思路：

本题也是经典的KMP题目，寻找重复子串怎么也涉及到KMP算法了呢？

这里就要说一说next数组了，next 数组记录的就是最长相同前后缀，如果 next[len - 1] != 0，则说明字符串有最长相同的前后缀。如果len % (len - (next[len - 1] + 1)) == 0 ，则说明 (数组长度-最长相等前后缀的长度) 正好可以被 数组的长度整除，说明有该字符串有重复的子字符串。

```js
var repeatedSubstringPattern = function (s) {
    // 构建next数组
    let len = s.length
    let next = [0]
    for (let i = 1, j = 0; i < len; i++) {
        while (j > 0 && s[i] !== s[j]) j = next[j - 1]
        if (s[i] === s[j]) j++
        next[i] = j
    }
    if (next[len - 1] !== 0 && len % (len - next[len - 1]) === 0) {
        return true
    }
    return false
};
```





## 栈和队列

### 1.有效的括号

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

**示例 1：**

```
输入：s = "()"
输出：true
```

##### 思路：

用栈来存储数据，当遇到[({则入栈，遇到]})则判断栈顶是否对应的符号，是则出栈，不是则返回false。最后再判断栈是否为空。

```js
var isValid = function (s) {
  const charMap = { '{': '}', '[': ']', '(': ')' }
  const stack = []
  for (let i = 0; i < s.length; i++) {
    let item = s[i]
    if (charMap[item]) {
      stack.push(item)
    } else if (item === ')' || item === '}' || item === ']') {
      if (charMap[stack.pop()] !== item) return false
    }
  }
  return stack.length ? false : true
}
```



### 2.删除字符串中的所有相邻重复项

给出由小写字母组成的字符串 `S`，**重复项删除操作**会选择两个相邻且相同的字母，并删除它们。

在 S 上反复执行重复项删除操作，直到无法继续删除。

在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。

**示例：**

```
输入："abbaca"
输出："ca"
解释：
例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。
```

##### 思路：

利用栈后进先出的特点，遍历字符串，每次跟栈顶比较，如果相同则出栈，不同则入栈。

```js
var removeDuplicates = function (s) {
    let stack = []
    for (let i = 0; i < s.length; i++) {
        if (stack.length && stack[stack.length - 1] === s[i]) {
            stack.pop()
        } else {
            stack.push(s[i])
        }
    }
    return stack.join('')
};
```



### 3.逆波兰表达式求值

有效的算符包括 `+`、`-`、`*`、`/` 。每个运算对象可以是整数，也可以是另一个逆波兰表达式。

**说明：**

- 整数除法只保留整数部分。
- 给定逆波兰表达式总是有效的。换句话说，表达式总会得出有效数值且不存在除数为 0 的情况。

**示例 1：**

```
输入：tokens = ["2","1","+","3","*"]
输出：9
解释：该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9
```

##### 思路：

利用栈后进先出的特点，当遇到运算符号时，则把需要计算的值出栈，然后计算完后把结果再放到栈里；如果是数字则直接入栈。

```js
var evalRPN = function (tokens) {
    let stack = []
    const calc = {
        '+': (a, b) => a * 1 + b * 1,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b | 0
    }
    for (let i = 0; i < tokens.length; i++) {
        if ('+-/*'.indexOf(tokens[i]) > -1) {
            let val1 = stack.pop()
            let val2 = stack.pop()
            stack.push(calc[tokens[i]](val2, val1))
        } else {
            stack.push(tokens[i])
        }
    }
    return stack.pop()
};
```



### 4.滑动窗口最大值

给你一个整数数组 `nums`，有一个大小为 `k` 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 `k` 个数字。滑动窗口每次只向右移动一位。

返回滑动窗口中的最大值。

**示例 1：**

```
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

##### 思路：

利用队列来存储可能是最大值的数据，数据从大到小排列。当遇到比队尾的值大时，则把队尾出栈，然后把值入栈。判断队头是否已经超出窗口，超出则把对头出队列。

```js
var maxSlidingWindow = function (nums, k) {
    let queue = []
    let res = []
    for (let i = 0; i < nums.length; i++) {
        // 判断值是否大于队尾的值
        while (queue.length && nums[i] > nums[queue[queue.length - 1]]) {
            queue.pop()
        }
        // 把索引放入队列
        queue.push(i)
        // 超出窗口，移出队列
        while (queue[0] <= i - k) queue.shift()
        // 把窗口的最大值放入结果列表
        if (i >= k - 1) res.push(nums[queue[0]])
    }
    return res
};
```



### 5.前 K 个高频元素

给你一个整数数组 `nums` 和一个整数 `k` ，请你返回其中出现频率前 `k` 高的元素。你可以按 **任意顺序** 返回答案。

**示例 1:**

```
输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
```

##### 思路：

首先要统计元素出现的频率，然后对频率进行排序，最后找出k个高频元素。这里可以用堆来处理，堆要保存出现频率最高的k个元素，遇到比堆顶大的则要加入堆里，所以要用到小顶堆。

```js
var topKFrequent = function (nums, k) {
  let map = new Map(),
    heap = [,];
  nums.map((num) => {
    if (map.has(num)) map.set(num, map.get(num) + 1);
    else map.set(num, 1);
  });

  // 如果元素数量小于等于 k
  if (map.size <= k) {
    return [...map.keys()];
  }

  // 如果元素数量大于 k，遍历map，构建小顶堆
  let i = 0;
  map.forEach((value, key) => {
    if (i < k) {
      // 取前k个建堆, 插入堆
      heap.push(key);
      // 原地建立前 k 堆
      if (i === k - 1) buildHeap(heap, map, k);
    } else if (map.get(heap[1]) < value) {
      // 替换并堆化
      heap[1] = key;
      // 自上而下式堆化第一个元素
      heapify(heap, map, k, 1);
    }
    i++;
  });
  // 删除heap中第一个元素
  heap.shift();
  return heap;
};

// 原地建堆，从后往前，自上而下式建小顶堆
let buildHeap = (heap, map, k) => {
  if (k === 1) return;
  // 从最后一个非叶子节点开始，自上而下式堆化
  for (let i = Math.floor(k / 2); i >= 1; i--) {
    heapify(heap, map, k, i);
  }
};

// 堆化
let heapify = (heap, map, k, i) => {
  // 自上而下式堆化
  while (true) {
    let min = i;
    if (2 * i <= k && map.get(heap[2 * i]) < map.get(heap[i])) {
      min = 2 * i;
    }
    if (2 * i + 1 <= k && map.get(heap[2 * i + 1]) < map.get(heap[min])) {
      min = 2 * i + 1;
    }
    if (min !== i) {
      [heap[i], heap[min]] = [heap[min], heap[i]]
      i = min;
    } else {
      break;
    }
  }
};
```





## 二叉树

### 1.二叉树理论基础

#### 二叉树的种类

- **满二叉树**：深度为k，有2^k-1个节点的二叉树
- **完全二叉树**：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层**最左边**的若干位置。
- **二叉搜索树**：是一个**有序树**。左子树的节点均小于根节点，右子树的节点均大于根节点。
- **平衡二叉搜索树**:又被称为AVL（Adelson-Velsky and Landis）树，且具有以下性质：它是一棵空树或它的左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。

#### 二叉树的存储方式

二叉树可以链式存储，也可以顺序存储。链式存储方式就用指针， 顺序存储的方式就是用数组。

#### 二叉树的遍历方式

二叉树主要有两种遍历方式：

- 深度优先遍历：先往深走，遇到叶子节点再往回走。

- 广度优先遍历：一层一层的去遍历。

那么从深度优先遍历和广度优先遍历进一步拓展，才有如下遍历方式：

- 深度优先遍历
  - 前序遍历（递归法，迭代法）
  - 中序遍历（递归法，迭代法）
  - 后序遍历（递归法，迭代法）
- 广度优先遍历
  - 层次遍历（迭代法）

在深度优先遍历中：有三个顺序，前中后序遍历。**这里前中后，其实指的就是中间节点的遍历顺序**

看如下中间节点的顺序，就可以发现，中间节点的顺序就是所谓的遍历方式

- 前序遍历：中左右
- 中序遍历：左中右
- 后序遍历：左右中



### 2.二叉树的遍历

#### 递归遍历

**每次写递归，都按照这三要素来写，可以保证大家写出正确的递归算法！**

1. **确定递归函数的参数和返回值：** 确定哪些参数是递归的过程中需要处理的，那么就在递归函数里加上这个参数， 并且还要明确每次递归的返回值是什么进而确定递归函数的返回类型。
2. **确定终止条件：** 写完了递归算法, 运行的时候，经常会遇到栈溢出的错误，就是没写终止条件或者终止条件写的不对，操作系统也是用一个栈的结构来保存每一层递归的信息，如果递归没有终止，操作系统的内存栈必然就会溢出。
3. **确定单层递归的逻辑：** 确定每一层递归需要处理的信息。在这里也就会重复调用自己来实现递归的过程。

#### 前序遍历

**示例:**

```text
示例:

输入: [1,null,2,3]
   1
    \
     2
    /
   3

输出: [1,2,3]
```

来源: [LeetCode 第 144 题](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

##### 递归方式

```js
var preorderTraversal = function (root) {
  let result = [];
  const preorder = (node) => {
    if (node == null) return;
    result.push(node.val);
    preorder(node.left);
    preorder(node.right);
  };
  preorder(root);
  return result;
};
```

##### 非递归方式

```js
var preorderTraversal = function (root) {
  if (root == null) return [];
  let res = [],
    stack = [];
  stack.push(root);
  while (stack.length) {
    let node = stack.pop();
    res.push(node.val);
    // 利用栈后进先出的特点，右孩子先进栈
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return res;
};
```

#### 中序遍历

给定一个二叉树，返回它的中序 遍历。

示例:

```text
输入: [1,null,2,3]
   1
    \
     2
    /
   3
输出: [1,3,2]
```

来源: [LeetCode 第 94 题](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

##### 递归方式:

```js
var inorderTraversal = function (root) {
  const result = [];
  const traverse = (node) => {
    if (node == null) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  };
  traverse(root);
  return result;
};
```

##### 非递归方式

思路：先遍历左右左节点并入栈，直到左节点为空，此时栈顶这时最左边的元素，把栈顶出栈并放入结果数组中。如果存在右节点，则继续遍历右节点的左节点，如果不存在，则依次出栈。

```js
var inorderTraversal = function (root) {
  const res = [],
    stack = [];
  let p = root;
  while (p || stack.length) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    let node = stack.pop();
    res.push(node.val);
    p = node.right;
  }
  return res;
};
```

#### 后序遍历

给定一个二叉树，返回它的 后序 遍历。

示例:

```text
输入: [1,null,2,3]

   1
    \
     2
    /
   3

输出: [3,2,1]
```

来源: [LeetCode 第 145 题](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

##### 递归方式

```js
var postorderTraversal = function (root) {
  const res = [];
  const traverse = (node) => {
    if (node == null) return;
    traverse(node.left);
    traverse(node.right);
    res.push(node.val);
  };
  traverse(root);
  return res;
};
```

##### 非递归方式

思路：后序遍历和中序遍历的区别在于，后序遍历要先打印右节点，其实也可以看做当没有右节点的时候才开始打印。所以在遍历完左节点后，要先获取栈顶元素，看是否有右节点，没有右节点才进行出栈；有右节点则要继续遍历右节点的左节点。这里有个细节需要注意，就是在判断栈顶是否有右节点的时候，如果节点是已经访问过了，需要标识，否则会出现无限循环的问题。

```js
var postorderTraversal = function (root) {
  let res = [],
    stack = [],
    visited = new Set();
  let p = root;
  while (p || stack.length) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    // 获取栈顶元素
    let node = stack[stack.length - 1];
    // 判断是否有右节点且没访问过
    if (node.right && !visited.has(node.right)) {
      p = node.right;
      visited.add(p);
    } else {
      node = stack.pop();
      res.push(node.val);
    }
  }
  return res;
};
```



### 3.二叉树的层序遍历

#### 3.1 二叉树的层序遍历

给你一个二叉树，请你返回其按 **层序遍历** 得到的节点值。 （即逐层地，从左到右访问所有节点）。

**示例：**
二叉树：`[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

返回其层序遍历结果：

```
[
  [3],
  [9,20],
  [15,7]
]
```

来源: [LeetCode 第 102 题](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

##### 思路：

利用队列先进先出的特点，一层一层进行遍历。如何判断是同一层呢？可以通过当前队列的长度来判断。

```js
var levelOrder = function (root) {
    if (!root) return []
    const queue = [root]
    const res = []
    while (queue.length) {
        let len = queue.length
        const curLevel = []
        while (len--) {
            let node = queue.shift()
            curLevel.push(node.val)
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
        res.push(curLevel)
    }
    return res
}
```

#### 3.2 二叉树的右视图

给定一个二叉树的 **根节点** `root`，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

**示例 1:**

![img](https://assets.leetcode.com/uploads/2021/02/14/tree.jpg)

```
输入: [1,2,3,null,5,null,4]
输出: [1,3,4]
```

##### 思路：

同样是利用队列来处理每一层，当处理到每一层的最后一个节点时，把节点放入结果中。

```js
var rightSideView = function (root) {
    if (!root) return []
    const res = [], queue = [root]
    while (queue.length) {
        let len = queue.length
        while (len--) {
            const node = queue.shift()
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
            if (len === 0) {
                res.push(node.val)
            }
        }
    }
    return res
}
```



#### 3.3最大深度

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**说明:** 叶子节点是指没有子节点的节点。

**示例：** 给定二叉树 [3,9,20,null,null,15,7]：

```text
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。 来源: [LeetCode 第 104 题](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

##### 递归实现

思路：父节点的深度 = 左右节点的最大深度 + 1

```js
var maxDepth = function (root) {
  if (root == null) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
```

##### 非递归实现

思路：采用层序遍历，遍历的时候先获取当前层的个数，当前层遍历完，depth+1 即可。

```js
var maxDepth = function (root) {
  if (root == null) return 0;
  let depth = 0;
  let queue = [root];
  while (queue.length) {
    let len = queue.length;
    while (len--) {
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    depth++;
  }
  return depth;
};
```

#### 3.4最小深度

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

**说明:** 叶子节点是指没有子节点的节点。

**示例:**

给定二叉树 [3,9,20,null,null,15,7]:

```text
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最小深度 2.

来源: [LeetCode 第 111 题](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

##### 递归实现

思路：刚开始以为跟最大深度类似，实现过程中发现有陷阱，即当 root 有个子节点是空的时候，结果就是错误的。所以在获取最小深度的时候应该根据左右节点是否为空来返回不同的值。

```js
var minDepth = function (root) {
  if (root == null) return 0;
  if (root.left && root.right) {
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
  } else if (root.left) {
    return minDepth(root.left) + 1;
  } else if (root.right) {
    return minDepth(root.right) + 1;
  } else {
    return 1;
  }
};
```

##### 非递归实现

思路：跟最大深度类似，只不过当左右节点不存在的时候直接返回当前层级+1.

```js
var minDepth = function (root) {
  if (root == null) return 0;
  let depth = 0;
  let queue = [root];
  while (queue.length) {
    let size = queue.length;
    while (size--) {
      const node = queue.shift();
      if (!node.left && !node.right) return depth + 1;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    depth++;
  }
  return depth;
};
```



### 4.二叉树的修改与构造

#### 226.反转二叉树

翻转一棵二叉树。

**示例：**

输入：

```
     4
   /   \
  2     7
 / \   / \
1   3 6   9
```

输出：

```
     4
   /   \
  7     2
 / \   / \
9   6 3   1
```

##### 思路：

遍历所有节点，把每个节点的左右孩子反转一下即可。可以通过深度优先和广度优先来进行遍历。

##### 深度优先 - 递归

```js
var invertTree = function (root) {
    if (!root) return null
    const right = invertTree(root.right)
    const left = invertTree(root.left)
    root.left = right
    root.right = left
    return root
}
```



##### 深度优先 - 迭代

```js
var invertTree = function (root) {
    if (!root) return root
    function swap(node) {
        const right = node.right
        node.right = node.left
        node.left = right
    }
    const stack = [root]
    while (stack.length) {
        let node = stack.pop()
        swap(node)
        // 利用栈后进先出，先放入右节点
        node.right && stack.push(node.right)
        node.left && stack.push(node.left)
    }
    return root
}
```



##### 广度优先 - 层序遍历

```js
var invertTree = function (root) {
    if (!root) return root
    const queue = [root]
    while (queue.length) {
        let len = queue.length
        while (len--) {
            let node = queue.shift()
            swap(node)
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }

    }
    return root
}
```

#### 106.从中序与后序遍历序列构造二叉树

根据一棵树的中序遍历与后序遍历构造二叉树。

**注意:**
你可以假设树中没有重复的元素。

例如，给出

```
中序遍历 inorder = [9,3,15,20,7]
后序遍历 postorder = [9,15,7,20,3]
```

返回如下的二叉树：

```
    3
   / \
  9  20
    /  \
   15   7
```

##### 思路：

根据两个顺序来构造一个二叉树，可以先以后序数组的最后一个元素为切割点，先切中序数组，根据中序数组，反过来切后序数组，一层一层切下去，每次后序数组的最后一个元素就是节点元素。

流程如图：



![106.从中序与后序遍历序列构造二叉树](https://img-blog.csdnimg.cn/20210203154249860.png)

代码如下：

```js
var buildTree = function (inorder, postorder) {
    let len = postorder.length
    // 第一步 如果数组大小为0，说明是空节点
    if (!len) return null
    // 第二步 如果不为空，则取后序数组最后一个元素为节点的元素
    let root = new TreeNode(postorder[len - 1])
    // 第三步 找到节点元素在中序数组中的位置，作为切割点
    let index = inorder.indexOf(root.val)
    // 第四步 切割中序数组,切成中序左数组和中序右数组
    // 第五步 切割后序数组
    // 第六步 递归处理左区间和右区间
    root.left = buildTree(inorder.slice(0, index), postorder.slice(0, index))
    root.right = buildTree(inorder.slice(index + 1, inorder.length), postorder.slice(index, len - 1))
    return root
};
```



#### 105.从前序与中序遍历序列构造二叉树

给定一棵树的前序遍历 `preorder` 与中序遍历 `inorder`。请构造二叉树并返回其根节点。

##### 思路：

前序数组和后序数组的区别在于，后序数组取的是最后一个节点，前序数组取的是第一个节点，其他步骤都一样。

代码如下：

```js
var buildTree = function (preorder, inorder) {
    // 第一步 判断数组是否为空
    let len = preorder.length
    if (!len) return null
    // 第二步 取前序数组第一个元素作为节点元素
    let root = new TreeNode(preorder[0])
    // 第三步 从中序数组找出节点元素的位置
    let index = inorder.indexOf(root.val)
    // 第四步 切割中序数组
    // 第五步 切割前序数组
    // 第六步 递归处理左区间和右区间
    root.left = buildTree(preorder.slice(1, index + 1), inorder.slice(0, index))
    root.right = buildTree(preorder.slice(index + 1, len), inorder.slice(index + 1, len))
    return root
};
```

#### 617.合并二叉树

给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。

你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则**不为** NULL 的节点将直接作为新二叉树的节点。

**示例 1:**

```
输入: 
	Tree 1                     Tree 2                  
          1                         2                             
         / \                       / \                            
        3   2                     1   3                        
       /                           \   \                      
      5                             4   7                  
输出: 
合并后的树:
	     3
	    / \
	   4   5
	  / \   \ 
	 5   4   7
```

**注意:** 合并必须从两个树的根节点开始。

##### 思路：

遍历一棵树，然后处理两棵树对应的节点即可。

##### 递归：

1.确定入参和返回值

入参就是两个树的节点，返回值就是返回新的节点，也可以是在一棵树上进行修改。

2.确定终止条件

当两个树有其中一个不存在时，则返回另一个

3.确定单层递归逻辑

把两个树的节点值进行相加，然后递归处理树的左右节点。

代码如下：

```js
var mergeTrees = function (root1, root2) {
    if (!root1) return root2
    if (!root2) return root1
    let root = new TreeNode()
    root.val = root1.val + root2.val
    root.left = mergeTrees(root1.left, root2.left)
    root.right = mergeTrees(root1.right, root2.right)
    return root
};
```

##### 迭代法：

一开始想到的是用层序遍历，但如果是用新节点来处理的话，发现不太好弄，还得把新节点存到队列里面去。所以就改成在一个树上进行操作。比如在root1进行操作，那么要处理几种情况：

1.两个树的左节点都存在，则把两个树的左节点都压入队列

2.两个树的右节点都存在，则把两个树的右节点都压入队列

3.root1的左节点不存在但是root2的左节点存在，则把root2的左节点赋值给root1的左节点

4.root1的右节点不存在但是root2的右节点存在，则把root2的右节点赋值给root1的右节点

```js
var mergeTrees = function (root1, root2) {
    if (!root1) return root2
    if (!root2) return root1
    let queue = [root1, root2]
    while (queue.length) {
        let node1 = queue.shift(), node2 = queue.shift()
        node1.val += node2.val
        if (node1.left && node2.left) {
            queue.push(node1.left)
            queue.push(node2.left)
        }
        if (node1.right && node2.right) {
            queue.push(node1.right)
            queue.push(node2.right)
        }
        if (!node1.left && node2.left) {
            node1.left = node2.left
        }
        if (!node1.right && node2.right) {
            node1.right = node2.right
        }
    }
    return root1
}
```

#### 654.最大二叉树

给定一个不含重复元素的整数数组 `nums` 。一个以此数组直接递归构建的 **最大二叉树** 定义如下：

1. 二叉树的根是数组 `nums` 中的最大元素。
2. 左子树是通过数组中 **最大值左边部分** 递归构造出的最大二叉树。
3. 右子树是通过数组中 **最大值右边部分** 递归构造出的最大二叉树。

返回有给定数组 `nums` 构建的 **最大二叉树** 。

##### 思路：

构造二叉树一般采用的是前序遍历，因为先构造中间节点，然后递归左子树和右子树。

##### 递归

1.确定递归函数的参数和返回值

参数就是存放元素的数组，返回该数组构造的二叉树的头结点。

2.确定终止条件

当数组为空的时候则返回空节点

3.确定单层递归的逻辑

找出最大值和对应的下标，构造根节点，然后递归处理左右子节点。

代码如下：

```js
var constructMaximumBinaryTree = function (nums) {
    if (!nums.length) return null
    let maxVal = Number.MIN_SAFE_INTEGER
    let index = -1
    nums.forEach((n, i) => {
        if (maxVal < n) {
            maxVal = n
            index = i
        }
    })
    let root = new TreeNode(maxVal)
    root.left = constructMaximumBinaryTree(nums.slice(0, index))
    root.right = constructMaximumBinaryTree(nums.slice(index + 1, nums.length))
    return root
};
```



### 5.求二叉树的属性

#### 101.对称二叉树

给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

```text
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

```text
    1
   / \
  2   2
   \   \
   3    3
```

来源: [LeetCode第101题](https://leetcode-cn.com/problems/symmetric-tree/)

##### 思路：

判断二叉树是否对称，要判断的是根节点的左子树和右子树是否相互反转的，所以我们要比较的是两个树。

##### 递归实现

思路：要判断二叉树是否对称，需要先判断节点的值是否相同，然后再判断节点1的左节点要等于节点2的右节点，节点1的右节点等于节点2的左节点。

递归三部曲：

1.确定递归函数的参数和返回值

由于我们要比较的是两个树，所以入参是两个节点，返回值是bool类型

2.确定终止条件

要比较两个节点是否相同，首先要把两个节点为空的情况弄清楚。

节点为空的情况主要有：

- 左右节点都为空，返回true
- 左右节点有一个为空，返回false
- 左右节点不为空，但是值不一样，返回false

3.确定单层递归的逻辑

单层的逻辑就是处理左右节点都不为空，且数值相同的情况。

- 比较外侧是否相同：传入的是左节点的左孩子，右节点的右孩子
- 比较内侧是否相同：传入的是左节点的右孩子，右节点的左孩子
- 只有内外侧都相同的情况才返回true，其他返回false

```js
var isSymmetric = function (root) {
    const compare = (node1, node2) => {
        if (!node1 && !node2) return true
        if (!node1 || !node2 || node1.val !== node2.val) return false
        return compare(node1.left, node2.right) && compare(node1.right, node2.left)
    }
    return compare(root.left, root.right)
}
```

##### 非递归实现

利用队列先进先出的特点，每次从队列取出两个节点进行比较，如果两个节点都为空，则继续比较，只要节点不相同则返回false。如果节点相同，则比较他们的子节点。

```js
var isSymmetric = function (root) {
    if (root == null) return true
    let queue = [root.left, root.right]
    let node1, node2
    while (queue.length) {
        node1 = queue.shift()
        node2 = queue.shift()
        if (!node1 && !node2) continue
        if (!node1 || !node2 || node1.val !== node2.val) return false
        // 把子节点压入队列
        queue.push(node1.left)
        queue.push(node2.right)
        queue.push(node1.right)
        queue.push(node2.left)
    }
    return true

}
```

#### 404.左叶子之和

计算给定二叉树的所有左叶子之和。

**示例：**

```
    3
   / \
  9  20
    /  \
   15   7

在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
```

##### 思路：

这题的难度在于要正确的定义左叶子，要判断一个节点是否左叶子有两个条件，一个是它是一个左节点，还有一个它是一个叶子节点，叶子节点就是没有左右子节点。知道了这个条件，我们就可以通过遍历，找到所有的叶子节点，再把他们的值加起来即可。

##### 递归实现

递归三部曲：

1.确定递归函数的参数和返回值

计算一个树的左叶子节点之和，需要传入树的根节点，递归函数的返回值为数值之和。

2.确定终止条件

依然是

```js
if(!root) return 0
```

3.确定单层递归的逻辑

当遇到左叶子节点的时候，记录数值，然后通过递归求取左子树左叶子之和和右子树左叶子之和，相加便是整个树的左叶子之和。

代码如下：

```js
var sumOfLeftLeaves = function (root) {
    // 1.确定入参和返回值
    // 2.确定终止条件
    if (!root) return 0
    // 3.确定单层逻辑
    const leftVal = sumOfLeftLeaves(root.left)
    const rightVal = sumOfLeftLeaves(root.right)
    let minVal = 0
    if (root.left && !root.left.left && !root.left.right) {
        minVal = root.left.val
    }
    return minVal + leftVal + rightVal
};
```

##### 迭代法 ：前序遍历

```js
var sumOfLeftLeaves = function (root) {
    if (!root) return 0
    let stack = [root], sum = 0
    while (stack.length) {
        let node = stack.pop()
        // 处理当前节点
        if (node.left && !node.left.left && !node.left.right) {
            sum += node.left.val
        }
        // 因为栈后进先出的特点，先压入右节点
        node.right && stack.push(node.right)
        node.left && stack.push(node.left)
    }
    return sum
}
```

##### 总结：

递归转成迭代法还是挺简单的，首先是要确定遍历的顺序，然后是确定单层逻辑，这两个确定好后，迭代法也就知道怎么写了。以前在写迭代法的时候都不知道遍历的顺序，看着别人怎么写就照着写，写完过段时间又忘了。



#### 513.找树左下角的值

给定一个二叉树的 **根节点** `root`，请找出该二叉树的 **最底层 最左边** 节点的值。

假设二叉树中至少有一个节点。

 

**示例 1:**

![img](https://assets.leetcode.com/uploads/2020/12/14/tree1.jpg)

```
输入: root = [2,1,3]
输出: 1
```

##### 思路：

一开始没理解清楚题意，以为找的是最底部的左叶子节点。所以我想的是先判断是左叶子节点，再判断是深度。结果题意是找最底边，最左边的节点，最左边的节点不一定是左叶子节点，因为有可能左节点不存在。所以只要判断深度和每一层的第一个节点即可。

##### 递归：

1.确定递归函数的参数和返回值

参数必须要有根节点，还有一个变量来记录当前深度。这里不需要返回值，但需要两个全局变量，maxDepth用来记录最大深度，maxLeftVal用来记录最大深度最左边的数值。

2.确定终止条件

当遇到叶子节点就得更新最大深度。

3.确定单层递归的逻辑

在找最大深度的时候，递归的过程中依然要使用回溯

```js
var findBottomLeftValue = function (root) {
    let maxLeftVal = root.val, maxDepth = Number.MIN_SAFE_INTEGER
    const find = (node, depth) => {
        if (!node.left && !node.left) {
            if (depth > maxDepth) {
                maxDepth = depth
                maxLeftVal = node.val
            }
        }
        node.left && find(node.left, depth + 1)
        node.right && find(node.right, depth + 1)
    }
    find(root, 0)
    return maxLeftVal
};
```



##### 迭代法：层序遍历

```js
var findBottomLeftValue = function (root) {
    let maxLeftVal = Number.MIN_SAFE_INTEGER, queue = [root]
    while (queue.length) {
        let len = queue.length
        for (let i = 0; i < len; i++) {
            let node = queue.shift()
            if (i === 0) {
                maxLeftVal = node.val
            }
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
    }
    return maxLeftVal
}
```

#### 543. 二叉树的直径

给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过根结点。

示例 : 给定二叉树

```text
          1
         / \
        2   3
       / \     
      4   5  
```

返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。

注意：两结点之间的路径长度是以它们之间边的数目表示。

来源: [LeetCode第543题](https://leetcode-cn.com/problems/diameter-of-binary-tree/)

##### 思路

所谓求直径，就是求树中节点左右子树高度和的最大值。

需要一个辅助函数，用于计算节点的高度，在计算的过程中，判断左右子树高度和是否大于最大值，是则更新最大值。

```js
var diameterOfBinaryTree = function (root) {
    const help = (node) => {
        if (node == null) return 0
        let left = help(node.left)
        let right = help(node.right)
        max = Math.max(left + right, max)
        // 返回节点的高度
        return Math.max(left, right) + 1
    }
    let max = 0
    help(root)
    return max
};
```

#### 257. 二叉树的所有路径

给定一个二叉树，返回所有从根节点到叶子节点的路径。

**说明:** 叶子节点是指没有子节点的节点。

**示例:**

```text
输入:

   1
 /   \
2     3
 \
  5

输出: ["1->2->5", "1->3"]
```



**解释:** 所有根节点到叶子节点的路径为: 1->2->5, 1->3

来源: [LeetCode第257题](https://leetcode-cn.com/problems/binary-tree-paths/submissions/)

##### 递归解法

思路：利用深度优先遍历，在遍历过程中把节点放入path数组，当遍历到叶子节点，则把路径添加到结果数组中。然后把节点从path弹出来，达到回溯效果的作用。

```js
var binaryTreePaths = function (root) {
    let path = [], res = []
    const dfs = (node) => {
        if (node == null) return
        path.push(node)
        dfs(node.left)
        dfs(node.right)
        if (!node.left && !node.right) {
            res.push(path.map(item => item.val).join('->'))
        }
        // 注意每访问完一个节点记得把它从path中删除，达到回溯效果
        path.pop()
    }
    dfs(root)
    return res
}
```

##### 非递归解法

思路：利用非递归的后序遍历，遇到叶子节点，把路径添加到结果即可。

```js
var binaryTreePaths = function (root) {
    let stack = [], res = [], set = new Set()
    let p = root
    while (stack.length || p) {
        while (p) {
            stack.push(p)
            p = p.left
        }
        const node = stack[stack.length - 1]
        if (!node.left && !node.right) {
            res.push(stack.map(item => item.val).join('->'))
        }
        if (node.right && !set.has(node.right)) {
            set.add(node.right)
            p = node.right
        } else {
            stack.pop()
        }
    }
    return res
}
```



#### 124. 二叉树的最大路径和

给定一个非空二叉树，返回其最大路径和。

本题中，路径被定义为一条从树中任意节点出发，达到任意节点的序列。该路径至少包含一个节点，且不一定经过根节点。

**示例**:

```text
输入: [-10,9,20,null,null,15,7]

   -10
   / \
  9  20
    /  \
   15   7

输出: 42
```

来源: [LeetCode第124题](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)

##### 递归解法

思路：这题跟求直径有点类似，只不过增加了节点值，而且值还有可能是负数，只要把负数当0处理即可。

```js
var maxPathSum = function (root) {
    const help = (node) => {
        if (node == null) return 0
        let left = Math.max(help(node.left), 0)
        let right = Math.max(help(node.right), 0)
        max = Math.max(left + right + node.val, max)
        // 返回当前节点的最大路径
        return Math.max(left, right) + node.val
    }
    let max = Number.MIN_SAFE_INTEGER
    help(root)
    return max
};
```



#### 112.路径总和

给你二叉树的根节点 `root` 和一个表示目标和的整数 `targetSum` ，判断该树中是否存在 **根节点到叶子节点** 的路径，这条路径上所有节点值相加等于目标和 `targetSum` 。

**叶子节点** 是指没有子节点的节点。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsum1.jpg)

```
输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
输出：true
```

##### 思路

这题要我们找出从根节点和叶子节点的路径总和是不是等于目标值。可以用深度优先遍历的方式来做。

##### 递归

1.确定递归函数的参数和返回值

参数：需要二叉树的根节点，还需要一个计数器，这个计数器用来判断一条路径之和是否等于目标值。

返回值：函数什么时候需要返回值，什么时候不需要返回值？

这里给出一个结论：

**如果需要搜索整颗二叉树，那么递归函数不需要返回值；如果只需要搜索其中一条符合条件的路，那么就需要返回值，因为遇到符合条件的路径就要及时返回。**

本题，我们要找一条符合条件的路径，所以需要返回值，返回值是一个bool类型。

2.确定终止条件

让计数器初始化为目标值，然后每次减去遍历路径节点上的值，当计数器为0，并且是叶子节点时，说明找到了目标和。如果是叶子节点，但计数器不为0，就是没找到。

3.确定单层递归的逻辑

因为终止条件是判断叶子节点，所以递归的过程就不要让空节点进入递归了。

递归是有返回值的，当递归函数返回true，说明找到合适的路径，应该立刻返回。

代码如下：

```js
var hasPathSum = function (root, targetSum) {
    if (!root) return false
    const traversal = (root, target) => {
        // 如果是叶子节点，并且计数器为0则返回true
        if (!root.left && !root.right && target === 0) return true
        if (!root.left && !root.right) return false
        // 如果有左节点，并且找到路径则返回true
        if (root.left && traversal(root.left, target - root.left.val)) return true
        // 如果有右节点，并且找到路径则返回true
        if (root.right && traversal(root.right, target - root.right.val)) return true
        return false
    }
    return traversal(root, targetSum - root.val)
};
```

##### 迭代

如果使用栈模拟递归的话，如何做回溯呢？

此时栈里一个元素不仅要记录该节点指针，还要记录从头节点到该节点的路径数值总和。

```js
var hasPathSum = function (root, targetSum) {
    if (!root) return false
    let res = false, stack = [[root, root.val]]
    while (stack.length) {
        let item = stack.pop()
        let [node, sum] = item
        if (!node.left && !node.right && sum === targetSum) {
            return true
        }
        node.right && stack.push([node.right, sum + node.right.val])
        node.left && stack.push([node.left, sum + node.left.val])
    }
    return res
}
```

#### 113.路径总和II

给你二叉树的根节点 `root` 和一个整数目标和 `targetSum` ，找出所有 **从根节点到叶子节点** 路径总和等于给定目标和的路径。

**叶子节点** 是指没有子节点的节点。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsumii1.jpg)

```
输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
输出：[[5,4,11,2],[5,8,4,5]]
```

##### 思路：

要遍历整个树，找到所有路径，所以递归函数不需要返回值。

```js
var pathSum = function (root, targetSum) {
    let paths = []
    const traversal = (root, target, path = []) => {
        if (!root) return
        if (!root.left && !root.right && target === root.val) {
            path.push(root.val)
            paths.push(path)
            return
        }
        traversal(root.left, target - root.val, [...path, root.val])
        traversal(root.right, target - root.val, [...path, root.val])
    }
    traversal(root, targetSum)
    return paths
};
```

### 



### 6.二叉树公共祖先问题

LCA (Lowest Common Ancestor)即最近公共祖先问题。

> 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

#### 236.二叉树的最近公共祖先

对于一个普通的二叉树: root = [3,5,1,6,2,0,8,null,null,7,4]

```text
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
```

来源: [LeetCode 第 236 题](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

##### 祖先节点集合法

思路：先遍历一遍二叉树，记录每个节点的父节点，然后找出节点 p 的所有上层节点，最后根据节点 q，一层层往上找它的父节点，如果在节点 q 的父节点集合中，则表示找到了公共祖先直接返回。

```js
var lowestCommonAncestor = function (root, p, q) {
  let stack = [root],
    parentsMap = new WeakMap(),
    pSet = new Set();
  // 遍历二叉树获取所有节点的父节点
  while (stack.length) {
    const node = stack.pop();
    if (node.left) {
      stack.push(node.left);
      parentsMap.set(node.left, node);
    }
    if (node.right) {
      stack.push(node.right);
      parentsMap.set(node.right, node);
    }
  }
  // 获取p节点的祖先集合
  while (p) {
    pSet.add(p, 1);
    p = parentsMap.get(p);
  }
  while (q) {
    if (pSet.has(q)) return q;
    q = parentsMap.get(q);
  }
};
```

##### 深度优先遍历法

思路：深度优先遍历二叉树，如果当前节点为 p 或者 q，则直接返回，否则查看左右孩子，如果左孩子中不包含 p 或者 q，则返回右孩子；右孩子不包含 p 或者 q 则返回左孩子；剩下的情况是左右孩子都存在 p 或者 q 的情况，直接返回这个节点。

```js
var lowestCommonAncestor = function (root, p, q) {
  if (root == null || root == p || root == q) return root;
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  if (left == null) return right;
  if (right == null) return left;
  return root;
};
```

#### 235.二叉搜索树的最近公共祖先

给定如下二叉搜索树: root = [6,2,8,0,4,7,9,null,null,3,5]

```text
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
输出: 6
解释: 节点 2 和节点 8 的最近公共祖先是 6。
```

来源: [LeetCode 第 235 题](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

##### 实现

二叉搜索树作为一种特殊的二叉树，当然是可以用上述的两种方式来实现的。

不过借助二叉搜索树有序的特性，我们也可以写出另外一个版本的深度优化遍历。

##### 递归方式

```js
var lowestCommonAncestor = function (root, p, q) {
  if (root == null) return root;
  // root.val 比 p 和 q 都大，找左孩子
  if (root.val < p.val && root.val < q.val)
    return lowestCommonAncestor(root.right, p, q);
  // root.val 比 p 和 q 都小，找右孩子
  else if (root.val > p.val && root.val > q.val)
    return lowestCommonAncestor(root.left, p, q);
  return root;
};
```

##### 非递归方式

```js
var lowestCommonAncestor = function (root, p, q) {
  if (root == null) return root;
  while (root) {
    if (root.val > p.val && root.val > q.val) root = root.left;
    else if (root.val < p.val && root.val < q.val) root = root.right;
    else return root;
  }
};
```



### 



### 7.二叉搜索树的属性

#### 700.二叉搜索树中的搜索

给定二叉搜索树（BST）的根节点和一个值。 你需要在BST中找到节点值等于给定值的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 NULL。

例如，

```
给定二叉搜索树:

        4
       / \
      2   7
     / \
    1   3

和值: 2
```

你应该返回如下子树:

```
      2     
     / \   
    1   3
```

##### 思路：

二叉搜索树是一个有序树：

- 若它的左子树不为空，则左子树上所有节点的值均小于它的根节点
- 若它的右子树不为空，则右子树上所有节点的值均大于它的根节点
- 它的左右子树分别为二叉搜索树

这就决定了，二叉搜索树的递归遍历和迭代遍历和普通的二叉树不一样。

##### 递归法：

1.确定递归函数的参数和返回值。

入参为根节点和要搜索的值。返回值是搜索的值对应的节点。

2.确定结束条件

当节点不存在或者找到对应的值的时候则返回节点

3.确定单层递归逻辑

当节点的值大于搜索值时，则找节点的左节点；当节点的值小于搜索值时，则找右节点。

代码如下：

```js
var searchBST = function (root, val) {
    if (!root || root.val === val) return root
    if (root.val < val) {
        return searchBST(root.right, val)
    }
    if (root.val > val) {
        return searchBST(root.left, val)
    }
};
```

##### 迭代法：

二叉搜索树的迭代法相对简单，因为节点的有序性帮助我们确定了搜索的方向，不需要回溯，也不需要搜索其他节点。

```js
var searchBST = function (root, val) {
    while (root != null) {
        if (root.val < val) root = root.right
        else if (root.val > val) root = root.left
        else return root
    }
    return null
}
```

#### 24.验证二叉搜索树

给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：

- 节点的左子树只包含**小于**当前节点的数。
- 节点的右子树只包含**大于**当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。

**示例 1:**

```
输入:
    2
   / \
  1   3
输出: true
```

##### 思路：

因为二叉搜索树的有序性，当用中序遍历时，数值是递增的。所以可以用中序遍历，然后判断当前的值是否大于上一个值，小于的话则不是一个二叉搜索树。

##### 递归：

1.确定递归函数的参数和返回值

入参是根节点，返回的是验证二叉树的结果。

2.确定终止条件

当节点不存在则返回true，当节点的值比上一个值小，则返回false。

3.确定单层递归逻辑

用一个全局变量来保存上一个节点，然后利用中序遍历，当上一个节点的值大于当前节点的值，则返回false，否则，返回左右节点的结果。

代码如下：

```js
var isValidBST = function (root) {
  let pre = null
  const inOrder = (root) => {
    if (root == null) return true
    let left = inOrder(root.left)
    if (pre != null && pre.val >= root.val) return false
    pre = root
    let right = inOrder(root.right)
    return left && right
  }
  return inOrder(root)
}
```

##### 迭代法：

```js
var isValidBST = function (root) {
  let stack = []
  let cur = root
  let pre = null
  while (cur || stack.length) {
    if (cur) {
      stack.push(cur)
      cur = cur.left
    } else {
      cur = stack.pop()
      if (pre && pre.val >= cur.val) return false
      pre = cur
      cur = cur.right
    }
  }
  return true
}
```

#### 501.二叉搜索树中的众数

给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。

假定 BST 有如下定义：

- 结点左子树中所含结点的值小于等于当前结点的值
- 结点右子树中所含结点的值大于等于当前结点的值
- 左子树和右子树都是二叉搜索树

例如：
给定 BST `[1,null,2,2]`,

```
   1
    \
     2
    /
   2
```

`返回[2]`.

**提示**：如果众数超过1个，不需考虑输出顺序

##### 思路：

题目有两个关键点，一个是二叉搜索树，一个是众数。因为二叉搜索树是有序的，所以可以用中序遍历来把它转成有序的数组。然后我们在有序数组里面找出众数。由于是有序的数组，我们就可以弄一个变量count来保存当前值的个数，然后拿当前值和上个值进行比较，如果想等，则count+1，如果不相等，则count=1。那什么时候放进结果数组呢，这时还需要一个变量来保存最大个数maxCount，当count等于maxCount时，则把值放入数组。当count大于maxCount时，则要更新maxCount，并且情况数组，再把值放入数组。

##### 递归：

1.确定递归函数的参数和返回值。

入参是根节点，由于要遍历整个树，所以不需要返回值。

2.确定终止条件

当根节点为空时，则终止

3.确定单层递归逻辑

利用中序遍历，处理当前节点时，判断上个节点是否存在，存在则比较值是否相等，相等的话count+1，不相等则count=1。然后再判断count和maxCount的值 。

```js
var findMode = function (root) {
    let res = [], pre = null, count = 0, maxCount = 0
    const inOrder = (root) => {
        if (!root) return
        inOrder(root.left)

        if (!pre || pre.val !== root.val) {
            count = 1
        } else {
            count++
        }
        pre = root
        if (count === maxCount) {
            res.push(root.val)
        }
        if (count > maxCount) {
            maxCount = count
            res = [root.val]
        }
        inOrder(root.right)
    }
    inOrder(root)
    return res
};
```



### 8.二叉搜索树的修改与构造

#### 701.二叉搜索树中的插入操作

给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 输入数据 **保证** ，新值和原始二叉搜索树中的任意节点值都不同。

**注意**，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回 **任意有效的结果** 。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/05/insertbst.jpg)

```
输入：root = [4,2,7,1,3], val = 5
输出：[4,2,7,1,3,5]
```

##### 思路：

刚开始看到可能存在多种有效的插入方式，就不知道该怎么做。其实可以不考虑其他的插入方式，只要把值插入到末尾节点，这题就容易很多。

##### 递归：

1.确定递归函数的参数和返回值。

入参：根节点和要插入的值。返回值：根节点

2.确定函数终止条件

当节点为空时终止

3.确定递归单层逻辑

当遇到空节点时，返回要插入的值的节点。当节点的值小于要插入的值时，则处理右子节点，当节点的值大于要插入的值时，则处理左子节点，返回当前节点。

代码如下：

```js
var insertIntoBST = function (root, val) {
    if (!root) return new TreeNode(val)
    if (root.val > val) root.left = insertIntoBST(root.left, val)
    if (root.val < val) root.right = insertIntoBST(root.right, val)
    return root
};
```



#### 450.删除二叉搜索树中的节点

给定一个二叉搜索树的根节点 **root** 和一个值 **key**，删除二叉搜索树中的 **key** 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。

一般来说，删除节点可分为两个步骤：

1. 首先找到需要删除的节点；
2. 如果找到了，删除它。

**说明：** 要求算法时间复杂度为 O(h)，h 为树的高度。

**示例:**

```
root = [5,3,6,2,4,null,7]
key = 3

    5
   / \
  3   6
 / \   \
2   4   7
```

##### 思路：

搜索树节点的删除要比节点的新增复杂的多，有很多情况需要考虑。

##### 递归：

1.确定函数的参数和返回值

入参：根节点和要删除的值。

返回值：返回处理后的根节点

2.确定函数的终止条件

当节点为空时终止

3.确定递归函数单层逻辑

在删除节点有几种情况需要考虑：

- 节点没有子节点时，则把节点删除
- 节点只有左子节点，则把左子节点返回
- 节点只有右子节点，则把右子节点返回
- 节点的左右子节点都存在时，则找到右子节点的最底层的左子节点p，然后把节点的子节点作为p的左子节点，返回右子节点即可。

代码如下：

```js
var deleteNode = function (root, key) {
    if (!root) return root
    if (root.val === key) {
        if (!root.left) return root.right
        else if (!root.right) return root.left
        else {
            let cur = root.right
            while (cur.left) {
                cur = cur.left
            }
            cur.left = root.left
            return root.right
        }
    }
    if (root.val < key) {
        root.right = deleteNode(root.right, key)
    }
    if (root.val > key) {
        root.left = deleteNode(root.left, key)
    }
    return root
}
```





#### 669.修剪二叉搜索树

给你二叉搜索树的根节点 `root` ，同时给定最小边界`low` 和最大边界 `high`。通过修剪二叉搜索树，使得所有节点的值在`[low, high]`中。修剪树不应该改变保留在树中的元素的相对结构（即，如果没有被移除，原有的父代子代关系都应当保留）。 可以证明，存在唯一的答案。

所以结果应当返回修剪好的二叉搜索树的新的根节点。注意，根节点可能会根据给定的边界发生改变。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/09/09/trim1.jpg)

```
输入：root = [1,0,2], low = 1, high = 2
输出：[1,null,2]
```

##### 思路：

利用二叉搜索树的特点，当节点的值小于左区间时，则处理右边子节点，当节点的值大于右区间，则只要处理左边子节点即可。

##### 递归：

1.确定函数的参数和返回值

入参：根节点，左右区间的值。返回值是处理后的根节点

2.确定终止条件

当节点不存在是终止

3.确定递归单层逻辑

当节点的值小于左区间时，则把它的右节点返回，当节点的值大于右区间时，则返回左节点。符合区间的，则递归处理它的左右节点。

代码如下：

```js
var trimBST = function (root, low, high) {
    if (!root) return null
    if (root.val < low) return trimBST(root.right, low, high)
    if (root.val > high) return trimBST(root.left, low, high)
    root.left = trimBST(root.left, low, high)
    root.right = trimBST(root.right, low, high)
    return root
}
```



#### 108.将有序数组转换为二叉搜索树

给你一个整数数组 `nums` ，其中元素已经按 **升序** 排列，请你将其转换为一棵 **高度平衡** 二叉搜索树。

**高度平衡** 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/02/18/btree1.jpg)

```
输入：nums = [-10,-3,0,5,9]
输出：[0,-3,9,-10,null,5]
解释：[0,-10,5,null,-3,null,9]
```

##### 思路：

构建一棵二叉树，本质上是寻找分割点，分割点作为当前节点，然后递归左区间和右区间。而用有序数组来构建二叉搜索树，寻找分割点就更容易了，因为分割点就是数组中间的位置。

##### 递归：

1.确定函数的参数和返回值

入参是数组，返回值是根节点

2.确定终止条件

当数组为空的时候则终止

3.确定单层递归逻辑

计算数组中间的索引，然后根据索引对应的值创建一个节点，递归处理节点的左右子节点，最后返回节点。

代码如下：

```js
var sortedArrayToBST = function (nums) {
    const len = nums.length
    if (!len) return null
    let mid = len >> 1
    const root = new TreeNode(nums[mid])
    root.left = sortedArrayToBST(nums.slice(0, mid))
    root.right = sortedArrayToBST(nums.slice(mid + 1, len))
    return root
}
```



#### 538.把二叉搜索树转换为累加树

给出二叉 **搜索** 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 `node` 的新值等于原树中大于或等于 `node.val` 的值之和。

**示例 1：**

**![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/05/03/tree.png)**

```
输入：[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
输出：[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
```

##### 思路：

从图中可以看出，累加的顺序是右中左，所以我们需要反中序遍历这个二叉树，然后顺序累加即可。

##### 递归：

1.确定函数参数和返回值

入参是根节点，返回值是处理后的根节点

2.确定终止条件

当节点为空的时候终止

3.确定单层递归逻辑

需要用到一个全局变量来保存当前累加的值，然后用反中序遍历，处理中间节点的时候把节点的值和当前累加的值相加，然后更新累加的值。

代码如下：

```js
var convertBST = function (root) {
    let sum = 0
    const traversal = (root) => {
        if (!root) return null
        traversal(root.right)
        root.val = root.val + sum
        sum = root.val
        traversal(root.left)
        return root
    }

    return traversal(root)
};
```



### 9.二叉树总结

在二叉树题目中，选择什么遍历顺序是我们最头疼的事情，这里做个分类：

- 涉及二叉树的构造，无论是二叉树还是二叉搜索树都是前序遍历，优先构造中节点。
- 求普通二叉树的属性，一般是后序遍历，一般要通过递归函数的返回值做计算。不过还是要具体问题具体分析。
- 求二叉搜索树的属性，一定是中序，因为是有序的。



## 回溯算法


按照如下顺序刷力扣上的题目，相信会帮你在学习回溯算法的路上少走很多弯路。

[关于回溯算法，你该了解这些！](https://mp.weixin.qq.com/s/gjSgJbNbd1eAA5WkA-HeWw)
组合问题
77.组合
77.组合（剪剪枝）
216.组合总和III
17.电话号码的字母组合
39.组合总和
40.组合总和II
分割问题
131.分割回文串
93.复原IP地址
子集问题
78.子集
90.子集II
排列问题
46.全排列
47.全排列II
棋盘问题
51.N皇后
37.解数独
其他
491.递增子序列
332.重新安排行程
回溯算法总结篇

## 分治算法

- https://www.ipaddress.com/ipv4/185.199.111.153)